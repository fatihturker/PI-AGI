import { OpenAIAzureProvider } from '../provider/open-ai.provider';
import { FileUtil } from '../util/file.util';

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
}
