import axios, { AxiosInstance, AxiosResponse } from "axios";
import { XAICompletionParams, XAICompletionResponse } from "@/types/xai";
import { Message } from "@/types/message";
import { BaseAIService } from "./AIService";


class XAIService implements BaseAIService {
  client: AxiosInstance;
  model: string;

  constructor(apiKey: string, baseURL?: string, model?: string) {
    this.client = axios.create({
      baseURL: baseURL ? baseURL : "https://api.x.ai/v1",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    }) 

    this.model = model || "grok-beta";
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
        id: response.data.id,
        content: response.data.choices.map((message) => ({
          type: "text",
          text: message.message.content
        })),
        role: response.data.choices[0].message.role       
      }

      return message;
    } catch (error) {
      console.error("Error calling XAIService.promptForTextReply: ", error);
      throw new Error(`Error calling XAIService.promptForTextReply: ${error}`);
    }
    
  }
}

export default XAIService;
