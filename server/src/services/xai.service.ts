import axios, { AxiosInstance, AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

import { XAIChatCompletionParams, XAICompletionResponse } from "@/types/xai";
import { BaseAIService } from "./AIService";
import { MessageService } from "./message.service";
import { ChatService } from "./chat.service";
import { Message } from "@/types/message";


class XAIService implements BaseAIService {
  private client: AxiosInstance;
  private messageService: MessageService;
  private chatService: ChatService;
  model: string;

  constructor(apiKey: string, messageService: MessageService, chatService: ChatService, baseURL?: string, model?: string) {
    this.client = axios.create({
      baseURL: baseURL ? baseURL : "https://api.x.ai/v1",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    this.model = model || "grok-beta";
    this.messageService = messageService; 
    this.chatService = chatService;
  }

  async createTextReplyFromConversation(messages: Message[], chatId: string): Promise<Message> {
    try {
      const response = await this.client.post<XAIChatCompletionParams, AxiosResponse<XAICompletionResponse>>("/chat/completions", {
        messages: [
          {
            role: "system",
            content: "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy."
          },
          ...messages.map(message => ({
            role: message.role,
            content: message.content[0].text
          })) 
        ],
        model: this.model,
        stream: false,
        temperature: 0
      });

      // Construct the message object from the API response
      const message: Message = {
        content: response.data.choices.map((message) => ({
          type: "text",
          text: message.message.content
        })),
        role: response.data.choices[0].message.role,
        model: response.data.model,     
        timestamp: new Date().toISOString(),
        id: uuidv4(), 
        chatId: chatId
      }

      // Add the generated message to the message service for storage
      this.messageService.addMessage(message);

      // update the messages to the ChatService
      this.chatService.updateChat(chatId, { messages: [...messages, message]})

      return message;
    } catch (error) {
      console.error("Error calling XAIService.createTextReplyFromConversation: ", error);
      throw new Error(`Error calling XAIService.createTextReplyFromConversation: ${error}`);
    }
  }

  async createTextReplyFromPrompt(prompt: string): Promise<Message> {
    try {
      // Create a new chat instance since no chatId is provided
      const {id: chatId} = this.chatService.createChat({ title: prompt, messages: [] });

      const message: Message = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        role: "user",
        model: this.model,
        content: [
          {
            text: prompt,
            type: "text"
          }
        ],
        chatId
      }; 

      // add the prompt message to messageService 
      this.messageService.addMessage(message);

      // Generate a text reply based on the newly created chat
      return this.createTextReplyFromConversation([message], chatId);
    } catch (error) {
      console.error(error);
      throw new Error(`Error calling XAIService.createTextReplyFromPrompt: ${error}`);
    }
  }
}

export default XAIService;