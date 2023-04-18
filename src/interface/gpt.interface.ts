import { ActionType } from '../enum/action-type.enum';

/**
 * Interface for defining a message with a role and content.
 */
export interface Message {
  role: string; // The role of the message, e.g. 'user', 'bot'.
  content: string; // The content of the message.
}

/**
 * Interface for defining the completion parameters for a GPT request.
 */
export interface Completion {
  model: string; // The name or ID of the model to use.
  messages: Message[]; // An array of messages for the completion.
  max_tokens: number; // The maximum number of tokens to generate.
  n: number; // The number of completions to generate.
  temperature: number; // The temperature for sampling.
}

/**
 * Interface for defining an action with a type and input.
 */
export interface Action {
  type: ActionType; // The type of the action.
  input: any; // The input data for the action.
}

/**
 * Interface for defining an action response with an action and a response.
 */
export interface ActionResponse {
  action: Action; // The action that was taken.
  response: any; // The response to the action.
}

/**
 * Interface for defining the response from a GPT request.
 */
export interface GPTResponse {
  step: string; // The name of the current step.
  completed: boolean; // A flag indicating whether the task was completed successfully.
  log: string; // Log information about the step that was completed.
  actions: Action[]; // An array of actions to take.
}

/**
 * Interface for defining the initial response from a GPT request.
 */
export interface InitialResponse extends GPTResponse {
  neededStepCount: number; // The total number of steps needed to complete the task.
  steps: string[]; // An array of step names.
}
