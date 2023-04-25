import { OpenAIAzureProvider } from '../provider/open-ai.provider';
import { FileUtil } from '../util/file.util';
import * as path from 'path';
import { Content } from '../interface/content.interface';
import { LoggerUtil } from '../util/logger.util';
import { MemoryUtil } from '../util/memory.util';
import { ActionUtil } from '../util/action.util';
import { StorageUtil } from '../util/storage.util';
import { ActionType } from '../enum/action-type.enum';
import { Action, ActionResponse } from '../interface/gpt.interface';

/**
 * A base class for AGI (Artificial General Intelligence).
 */
export class MainAGI {
  protected mainPrompt: string;
  protected nextPrompt: string;
  protected taskDir: string;
  protected ltmPath: string;
  protected logPath: string;
  protected consolidationId: string;

  protected fileUtil: FileUtil;

  /**
   * Creates a new MainAGI object.
   *
   * @param openAIProvider - The OpenAIAzureProvider to use for the AGI.
   */
  constructor(protected openAIProvider: OpenAIAzureProvider) {
    this.fileUtil = new FileUtil();
    this.mainPrompt = '';
    this.nextPrompt = '';
    this.ltmPath = '';
    this.consolidationId = '';
    this.taskDir = '';
    this.logPath = '';
  }

  /**
   * Initializes the AGI.
   */
  protected initialize() {
    this.ltmPath = path.join(
      __dirname,
      '..',
      '..',
      'output',
      'memory',
      this.consolidationId + '.json'
    );

    this.logPath = path.join(
      __dirname,
      '..',
      '..',
      'output',
      'log',
      this.consolidationId + '.log'
    );

    this.taskDir = path.join(
      __dirname,
      '..',
      '..',
      'task',
      this.consolidationId
    );
  }

  /**
   * Starts an AGI (Artificial General Intelligence) action by initializing necessary components,
   * clearing previous folders, and generating prompts for user input based on previous responses.
   * @param content Object containing information about the current action to be performed.
   * @returns A promise that resolves when the action is completed.
   */
  public start = async (content: Content): Promise<any> => {
    this.initialize();

    const loggerUtil = new LoggerUtil(this.consolidationId, this.logPath);

    await this.clearFolders(loggerUtil);

    await this.fileUtil.createFolder(this.taskDir);

    loggerUtil.log('Action started at ' + new Date().toISOString());

    this.openAIProvider.initialize(loggerUtil);

    const memoryUtil = new MemoryUtil(this.fileUtil, this.ltmPath);
    memoryUtil.resetLTM();

    const actionUtil = new ActionUtil(loggerUtil, this.taskDir, this.ltmPath);

    const storageUtil = new StorageUtil();

    let mainPrompt = this.mainPrompt
      .replace('{{ENVIRONMENT}}', content.environment)
      .replace('{{NAME}}', content.name)
      .replace('{{INPUT}}', content.input);

    let subPrompt = this.nextPrompt
      .replace('{{ENVIRONMENT}}', content.environment)
      .replace('{{NAME}}', content.name)
      .replace('{{INPUT}}', content.input);

    let max_tokens = this.openAIProvider.getMaxTokens(mainPrompt);

    mainPrompt = mainPrompt.replace('{{MAX_TOKEN}}', max_tokens.toString());

    let res = await this.openAIProvider.generateCompletion(
      mainPrompt,
      max_tokens
    );
    let parsed = await this.processGpt4ApiResponse(
      res as string,
      loggerUtil,
      0
    );
    memoryUtil.writeLTM(parsed);

    let estimation = 0;

    if (parsed.neededStepCount) {
      const action = {
        type: ActionType.REQUEST_USER_INPUT,
        input: {
          request:
            'I will need ' +
            parsed.neededStepCount.toString() +
            ' step to complete the task. To confirm type (y), otherwise I will stop.',
        },
      } as Action;

      const actRes = await actionUtil.takeAction(action);
      estimation = parsed.neededStepCount;
      if (actRes !== 'y') {
        return;
      }
    }

    const steps: string[] = parsed.steps;

    subPrompt = subPrompt
      .replace('{{ALL_STEPS}}', JSON.stringify(steps))
      .replace('{{MAX_ATTEMPT}}', estimation.toString());

    let attemptCount = 1;

    let iteration = 0;

    while (!parsed.completed && content.maxAttempt >= attemptCount) {
      // 20 seconds delay between each request to avoid exceeding rate limit
      this.delay(20000);

      const stepName = 'Step ' + attemptCount.toString() + ': ' + parsed.step;

      loggerUtil.log(stepName);

      storageUtil.addStep(parsed.step);

      let actionResponses: ActionResponse[] = [];

      if (
        parsed.actions &&
        Array.isArray(parsed.actions) &&
        parsed.actions.length > 0
      ) {
        for (const a of parsed.actions) {
          const actionResponse = { action: a } as ActionResponse;
          actionResponse.response = await actionUtil.takeAction(a);
          actionResponses.push(actionResponse);
        }
      }

      const lastSteps = storageUtil.getLastSteps();

      let nextPrompt = subPrompt
        .replace('{{ACTION_RESPONSES}}', JSON.stringify(actionResponses))
        .replace('{{LAST_STEPS}}', JSON.stringify(lastSteps));

      max_tokens = this.openAIProvider.getMaxTokens(nextPrompt);

      nextPrompt = nextPrompt.replace('{{MAX_TOKEN}}', max_tokens.toString());

      if (attemptCount === estimation + 10 * iteration) {
        iteration++;
        const action = {
          type: ActionType.REQUEST_USER_INPUT,
          input: {
            request:
              'I still have steps to complete the task. If you want me to continue with 10 more steps please confirm type (y), otherwise I will stop.',
          },
        } as Action;

        const actRes = await actionUtil.takeAction(action);
        if (actRes !== 'y') {
          return false;
        }
      }

      try {
        res = await this.openAIProvider.generateCompletion(
          nextPrompt,
          max_tokens
        );

        parsed = await this.processGpt4ApiResponse(
          res as string,
          loggerUtil,
          0
        );
      } catch (e) {
        loggerUtil.error('Error while generating completion: ', e);
      }

      memoryUtil.writeLTM(parsed);

      attemptCount++;
    }

    if (content.maxAttempt <= attemptCount) {
      loggerUtil.log('Reached out to maximum attempt.');
    }

    loggerUtil.log('Action ended at ' + new Date().toISOString());
  };

  /**
   * Clears task, LTM, and log folders using the fileUtil object.
   * Logs any errors using the provided loggerUtil object.
   * @param loggerUtil - The loggerUtil object to use for logging errors.
   */
  private clearFolders = async (loggerUtil: LoggerUtil) => {
    const ltmDirName = path.dirname(this.ltmPath);
    const logDirName = path.dirname(this.logPath);

    try {
      await this.fileUtil.clearFolder(this.taskDir);
    } catch (e) {
      loggerUtil.error('Error while clearing folders: ', e);
    }

    try {
      await this.fileUtil.clearFolder(ltmDirName);
    } catch (e) {
      loggerUtil.error('Error while clearing folders: ', e);
    }

    try {
      await this.fileUtil.clearFolder(logDirName);
    } catch (e) {
      loggerUtil.error('Error while clearing folders: ', e);
    }
  };

  /**
   * Processes the response from OpenAI's GPT-4 API.
   * @param response The response string from the GPT-4 API.
   * @param loggerUtil The logger utility to log messages.
   * @param retrial The number of times the method has been retried due to an invalid JSON response.
   * @returns The parsed JSON response from the GPT-4 API, or null if the response is invalid.
   */
  protected processGpt4ApiResponse = async (
    response: string,
    loggerUtil: LoggerUtil,
    retrial: number
  ): Promise<any> => {
    let responseObject;

    response = response.replace(/```json/g, '').replace(/```/g, '');

    try {
      // Attempt to parse the response as a JSON object
      responseObject = JSON.parse(response.trim());
    } catch (error) {
      // If the response is not a valid JSON string, print an error message
      const fixJson =
        'Fix this json and provide only fixed json object in the response: ' +
        response;
      loggerUtil.error('Received an invalid JSON response:', response);

      const max_tokens = this.openAIProvider.getMaxTokens(fixJson);
      const res = await this.openAIProvider.generateCompletion(
        fixJson,
        max_tokens
      );

      if (retrial < Number.parseInt(process.env.MAX_RETRY_COUNT as string)) {
        retrial++;
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            Number.parseInt(process.env.RETRY_INTERVAL as string)
          )
        );
        return await this.processGpt4ApiResponse(
          res as string,
          loggerUtil,
          retrial
        );
      }
    }

    if (!responseObject) {
      loggerUtil.error('Received an empty response object.');
      return;
    }

    // Now you can use 'responseObject' as a JSON object
    // You can add your logic here to handle the responseObject

    loggerUtil.log('Parsed JSON response:', responseObject);

    responseObject.completed = responseObject.completed
      ? responseObject.completed
      : false;

    // Example: If the responseObject has a 'completed' property and its value is true
    if (responseObject.completed) {
      loggerUtil.log('The project is completed.');
    } else {
      loggerUtil.log('The project is not completed yet.');
    }

    return responseObject;
  };

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
