import Anthropic from "@anthropic-ai/sdk";
import { v4 as uuidv4 } from "uuid";

import { Message, TextContentBlock } from "@/types/message";
import { BaseAIService } from "./AIService";
import { MessageParam } from "@anthropic-ai/sdk/resources";
import { MessageService } from "./message.service";
import { timeStamp } from "console";
import { ChatService } from "./chat.service";


class AnthropicService implements BaseAIService {
  anthropicInstance: Anthropic;
  private messageService: MessageService;
  private chatService: ChatService;

  constructor(apiKey: string, messageService: MessageService, chatService: ChatService, baseURL?: string) {
    this.anthropicInstance = new Anthropic({
      apiKey,
      baseURL
    });
    this.messageService = messageService;
    this.chatService = chatService;
  }

  async createTextReplyFromConversation(messages: Message[], chatId: string) {
    try {
      const response = await this.anthropicInstance.messages.create({
        model: "grok-beta",
        max_tokens: 128,
        system: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
        messages: (messages as MessageParam[]), 
      })
  
      const message: Message = {
        content: response.content as TextContentBlock[],
        role: response.role,
        timestamp: new Date().toISOString(),
        id:uuidv4(),
        model: "grok-beta",
        chatId 
      }

      // add the generated message to message service for storage
      this.messageService.addMessage(message);

      // update the message to the chat message
      this.chatService.updateChat(chatId, { messages: [...messages, message]});
  
      return message;
    } catch (error) {
      console.error("Error when calling AnthropicService.createTextReplyFromConversation", error);
      throw new Error("Error when calling AnthropicService.createTextReplyFromConversation");
    }
  }

  
  async createTextReplyFromPrompt(prompt: string): Promise<Message> {
    try {
      const { id: chatId } = this.chatService.createChat({ title: prompt, messages: []});

      const promptMessage: Message = {
        model: "grok-beta",
        role: "user",
        timestamp: new Date().toISOString(),
        id: uuidv4(),
        content: [{
          type: "text",
          text: prompt
        }],
        chatId
      };

      // add the prompt message to messageService
      this.messageService.addMessage(promptMessage);

      // Generate a text reply based on the newly created chat
      return this.createTextReplyFromConversation([promptMessage], chatId);
    } 
    catch (error) {
      console.error("Error when calling Anthropic message prompt: ", error);
      throw new Error(`Error when calling AnthropicService.createTextReplyFromPrompt: ${error}`);
    }
  }
}

export default AnthropicService;