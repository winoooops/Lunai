import axios, { AxiosInstance, AxiosResponse } from "axios";
import { config } from "dotenv";
import { promptForTextReply } from "./messages.service";
import { XAICompletionParams, XAICompletionResponse } from "@/types/xai";
import { Message } from "@/types/message";

config();

const XAI_API_KEY = process.env.XAI_API_KEY;
const BASE_URL = process.env.XAI_BASE_URL;

export class XAIService {
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

  async promptForTextReply(content: string): Promise<Message> {
    try {
      const response = await this.client.post<XAICompletionParams, AxiosResponse<XAICompletionResponse>>("/chat/completions", {
        messages: [
          {
            role: "system",
            content: "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy."
          },
          {
            role: "user",
            content
          }
        ],
        model: this.model,
        stream: false,
        temperature: 0
      });

      const message: Message = {
        id: response.data.id,
        content: response.data.choices.map((choice) => ({
          type: "text",
          text: choice.message.content
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
