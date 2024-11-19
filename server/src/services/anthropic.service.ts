import { Message, TextContentBlock } from "@/types/message";
import Anthropic from "@anthropic-ai/sdk";
import { BaseAIService } from "./AIService";


class AnthropicService implements BaseAIService {
  anthropicInstance: Anthropic;

  constructor(apiKey: string, baseURL?: string) {
    this.anthropicInstance = new Anthropic({
      apiKey,
      baseURL
    })
  }

  async promptForTextReply(content: string) {
    try {
      const response = await this.anthropicInstance.messages.create({
        model: "grok-beta",
        max_tokens: 128,
        system: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
        messages: [
          {
            role: "user",
            content
          }
        ]
      })
  
      const message: Message = {
        id: response.id,
        content: response.content as TextContentBlock[],
        role: response.role
      }
  
      return message;
    } catch (error) {
      console.error("Error when calling Anthropic message prompt: ", error);
      throw new Error("Error when calling Anthropic message prompt");
    }
  }
}

export default AnthropicService;