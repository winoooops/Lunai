import { Message } from "@/types/message";
import { BaseAIService, getAIService } from "@/services/AIService";


export class MessageHandler {
  private static aiService: BaseAIService = getAIService();
  /**
   * create a language model response for a given prompt text.
   * 
   * @param {string} text The prompt text to send to AI Service
   * @returns {Promise<Message>} A promise that resolves a Message object 
   * @throws {Error}
   */
  static promptForTextReply(text: string): Promise<Message> {
    try {
      return this.aiService.promptForTextReply(text);
    }
    catch (error){
      console.error(error);
      throw new Error("Failed to call Anthropic API");
    }
  }
}