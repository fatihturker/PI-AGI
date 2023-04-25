import { OpenAIAzureProvider } from './provider/open-ai.provider';
import { Content } from './interface/content.interface';
import { FileUtil } from './util/file.util';
import * as path from 'path';
import { config } from 'dotenv';
import { SeniorFrontendSoftwareEngineerAGI } from './agi/senior-frontend-software-engineer-agi.controller';
import { UserInteractionUtil } from './util/user-interaction.util';
import { SeniorBackendSoftwareEngineerAGI } from './agi/senior-backend-software-engineer-agi.controller';
import { EnvironmentUtil } from './util/environment.util';

config();

async function createContent(documentation: string): Promise<Content> {
  const environmentUtil = new EnvironmentUtil();
  const environment = environmentUtil.getEnvironmentInfo();
  console.log('Environment Information: ', environment);
  const userInteraction = new UserInteractionUtil();
  const applicationName = await userInteraction.getUserInput(
    'Enter your project name: '
  );
  const maxAttempt = Number.parseInt(process.env.MAX_ATTEMPT as string);

  return {
    input: documentation,
    name: applicationName,
    maxAttempt,
    environment,
  } as Content;
}

function createProvider(): OpenAIAzureProvider {
  const apiKey = process.env.API_KEY as string;
  const apiEndpoint = process.env.API_ENDPOINT as string;
  const apiVersion = process.env.API_VERSION as string;
  const maxToken = Number.parseInt(process.env.MAX_TOKEN as string);
  const maxRetryCount = Number.parseInt(process.env.MAX_RETRY_COUNT as string);
  const retryInterval = Number.parseInt(process.env.RETRY_INTERVAL as string);

  return new OpenAIAzureProvider(
    apiKey,
    apiEndpoint,
    apiVersion,
    maxToken,
    maxRetryCount,
    retryInterval
  );
}

/**
 * The main function for the frontend AGI.
 */
async function frontend() {
  const documentation = await new FileUtil().readFileContent(
    path.join(
      __dirname,
      'asset',
      'input',
      'frontend-example-project-documentation.md'
    )
  );

  const content = await createContent(documentation);
  const gptProvider = createProvider();
  const agi = new SeniorFrontendSoftwareEngineerAGI(gptProvider);

  agi.init();
  await agi.start(content);
}

async function backend() {
  const documentation = await new FileUtil().readFileContent(
    path.join(
      __dirname,
      'asset',
      'input',
      'backend-example-project-documentation.md'
    )
  );

  const content = await createContent(documentation);
  const gptProvider = createProvider();
  const agi = new SeniorBackendSoftwareEngineerAGI(gptProvider);

  agi.init();
  await agi.start(content);
}

async function promptUser() {
  const userInteraction = new UserInteractionUtil();

  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                PI AGI - Console Application              ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('\nChoose an AGI:');
  console.log('1. Senior Backend Engineer Node.js with TypeScript');
  console.log('2. Senior Frontend Engineer Angular');
  console.log('3. Exit');

  const choice = await userInteraction.getUserInput(
    'Enter your choice (1, 2, or 3): '
  );
  switch (choice) {
    case '1':
      backend();
      break;
    case '2':
      frontend();
      break;
    case '3':
      console.log('Goodbye!');
      break;
    default:
      console.log('Invalid choice. Please try again.');
      promptUser();
      break;
  }
}

promptUser();
