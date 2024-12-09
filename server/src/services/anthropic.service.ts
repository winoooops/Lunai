import Anthropic from "@anthropic-ai/sdk";
import { v4 as uuidv4 } from "uuid";

import { BaseAIService } from "./AIService";
import { MessageParam } from "@anthropic-ai/sdk/resources";
import { MessageService } from "./message.service";
import { ChatService } from "./chat.service";
import { Message, TextContentBlock } from "@LunaiTypes/message";


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


  async createTextReplyFromConversation(prompt: string, chatId: string): Promise<Message> {
    try {
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

      // should get the previous messages 
      const messages = this.chatService.getChatById(chatId)?.messages || [];  

      const response = await this.anthropicInstance.messages.create({
        model: "grok-beta",
        max_tokens: 128,
        system: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
        messages: ([...messages, promptMessage] as MessageParam[]), 
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

      // update the promptMesasge and message to the chat message
      // this.chatService.updateChat(chatId, { messages: [...messages, promptMessage, message]});
      this.chatService.appendMessage(chatId, promptMessage);
      this.chatService.appendMessage(chatId, message);
  
      return message;
    } catch (err) {
      if(err instanceof Anthropic.APIError) {
        const status = err.status;
        const error = err.error;
        let msg = "An unknown error occurred.";
        if(error !== undefined) {
          msg = (error as { code: string, error: string }).error;
        }
        throw new Error(`Error occurred - [${status} | error.error.code]: ${msg}`)
      }
      throw new Error("Error when calling AnthropicService.createTextReplyFromConversation");
    }
  }

  
  async createTextReplyFromPrompt(prompt: string): Promise<Message> {
    try {
      const { id: chatId } = this.chatService.createChat({ title: prompt, messages: []});

      // Generate a text reply based on the newly created chat
      return this.createTextReplyFromConversation(prompt, chatId);
    } 
    catch (error) {
      console.error("Error when calling Anthropic message prompt: ", error);
      throw new Error(`Error when calling AnthropicService.createTextReplyFromPrompt: ${error}`);
    }
  }
}

export default AnthropicService;