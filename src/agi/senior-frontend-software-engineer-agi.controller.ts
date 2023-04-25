import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { MainAGI } from './main.agi';
import { OpenAIAzureProvider } from '../provider/open-ai.provider';

/**
 * A class representing a Senior Frontend Software Engineer AGI.
 */
export class SeniorFrontendSoftwareEngineerAGI extends MainAGI {
  constructor(openAIProvider: OpenAIAzureProvider) {
    super(openAIProvider);
  }

  /**
   * Initializes the AGI.
   */
  async init() {
    this.consolidationId = uuidv4();
    super.consolidationId = this.consolidationId;

    super.initialize();

    this.mainPrompt = await this.fileUtil.readFileContent(
      path.join(
        __dirname,
        '..',
        'asset',
        'agi',
        'software-engineer',
        'frontend',
        'senior-frontend-engineer-angular-main.agi.md'
      )
    );

    this.nextPrompt = await this.fileUtil.readFileContent(
      path.join(
        __dirname,
        '..',
        'asset',
        'agi',
        'software-engineer',
        'frontend',
        'senior-frontend-engineer-angular-next.agi.md'
      )
    );
  }
}
