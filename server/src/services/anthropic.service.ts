import { Message, TextContentBlock } from "@/types/message";
import Anthropic from "@anthropic-ai/sdk";
import { BaseAIService } from "./AIService";
import { MessageParam } from "@anthropic-ai/sdk/resources";
import { MessageService } from "./message.service";


class AnthropicService implements BaseAIService {
  anthropicInstance: Anthropic;
  private messageService: MessageService;

  constructor(apiKey: string, messageService: MessageService, baseURL?: string) {
    this.anthropicInstance = new Anthropic({
      apiKey,
      baseURL
    });
    this.messageService = messageService;
  }

  async createTextReplyFromConversation(messages: Message[]) {
    try {
      const response = await this.anthropicInstance.messages.create({
        model: "grok-beta",
        max_tokens: 128,
        system: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
        messages: (messages as MessageParam[]), 
      })
  
      const message: Message = {
        content: response.content as TextContentBlock[],
        role: response.role
      }

      this.messageService.addMessage(message);
  
      return message;
    } catch (error) {
      console.error("Error when calling Anthropic message prompt: ", error);
      throw new Error("Error when calling Anthropic message prompt");
    }
  }
}

export default AnthropicService;