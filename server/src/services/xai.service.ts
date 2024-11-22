import axios, { AxiosInstance, AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

import { XAICompletionParams, XAICompletionResponse } from "@/types/xai";
import { Message } from "@/types/message";
import { BaseAIService } from "./AIService";
import { MessageService } from "./message.service";


class XAIService implements BaseAIService {
  private client: AxiosInstance;
  private messageService: MessageService;
  model: string;

  constructor(apiKey: string, messageService: MessageService, baseURL?: string, model?: string) {
    this.client = axios.create({
      baseURL: baseURL ? baseURL : "https://api.x.ai/v1",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    this.model = model || "grok-beta";
    this.messageService = messageService; 
  }

  async createTextReplyFromConversation(messages: Message[]): Promise<Message> {
    try {
      const response = await this.client.post<XAICompletionParams, AxiosResponse<XAICompletionResponse>>("/chat/completions", {
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

      const message: Message = {
        content: response.data.choices.map((message) => ({
          type: "text",
          text: message.message.content
        })),
        role: response.data.choices[0].message.role,
        model: this.model,     
        timestamp: new Date().toISOString(),
        id: uuidv4(), 
      }

      this.messageService.addMessage(message);

      return message;
    } catch (error) {
      console.error("Error calling XAIService.createTextReplyFromConversation: ", error);
      throw new Error(`Error calling XAIService.createTextReplyFromConversation: ${error}`);
    }
  }
}

export default XAIService;