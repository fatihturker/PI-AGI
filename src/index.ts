import { OpenAIAzureProvider } from './provider/open-ai.provider';
import { Content } from './interface/content.interface';
import { FileUtil } from './util/file.util';
import * as path from 'path';
import { config } from 'dotenv';
import { SeniorFrontendSoftwareEngineerAGI } from './agi/senior-frontend-software-engineer-agi.controller';

config();

/**
 * The main function for the frontend AGI.
 */
async function frontend() {
  // Get environment variables
  const API_KEY = process.env.API_KEY;
  const API_ENDPOINT = process.env.API_ENDPOINT;
  const API_VERSION = process.env.API_VERSION;
  const MAX_ATTEMPT = process.env.MAX_ATTEMPT;
  const MAX_TOKEN = process.env.MAX_TOKEN;
  const MAX_RETRY_COUNT = process.env.MAX_RETRY_COUNT;
  const RETRY_INTERVAL = process.env.RETRY_INTERVAL;

  // Read project documentation from file
  const documentation = await new FileUtil().readFileContent(
    path.join(__dirname, 'asset', 'input', 'project-documentation.md')
  );

  // Set application name and environment
  const applicationName = 'Momento';
  const environment = 'macOS 13.3.1 (22E261)';

  // Create content object
  const content = {
    input: documentation,
    name: applicationName,
    maxAttempt: Number.parseInt(MAX_ATTEMPT as string),
    environment,
  } as Content;

  // Initialize OpenAI provider
  const gptProvider = new OpenAIAzureProvider(
    API_KEY as string,
    API_ENDPOINT as string,
    API_VERSION as string,
    Number.parseInt(MAX_TOKEN as string),
    Number.parseInt(MAX_RETRY_COUNT as string),
    Number.parseInt(RETRY_INTERVAL as string)
  );

  // Initialize and start AGI
  const agi = new SeniorFrontendSoftwareEngineerAGI(gptProvider);
  await agi.startAgi(content);
}

// Call the frontend AGI
frontend();
