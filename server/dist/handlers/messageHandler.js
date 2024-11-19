import { getAIService } from "../services/AIService";
export class MessageHandler {
    /**
     * create a language model response for a given prompt text.
     *
     * @param {string} text The prompt text to send to AI Service
     * @returns {Promise<Message>} A promise that resolves a Message object
     * @throws {Error}
     */
    static promptForTextReply(text) {
        try {
            return this.aiService.promptForTextReply(text);
        }
        catch (error) {
            console.error(error);
            throw new Error("Failed to call Anthropic API");
        }
    }
}
MessageHandler.aiService = getAIService();
