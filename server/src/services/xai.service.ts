import axios, { AxiosInstance, AxiosResponse } from "axios";
import { XAICompletionChoice, XAICompletionParams, XAICompletionResponse } from "@/types/xai";
import { LunaiMessage, Message } from "@/types/message";
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

  async createTextReplyFromConversation(messages: LunaiMessage[]): Promise<Message> {
    try {
      const response = await this.client.post<XAICompletionParams, AxiosResponse<XAICompletionResponse>>("/chat/completions", {
        messages,
        model: this.model,
        stream: false,
        temperature: 0
      });

      const message: Message = {
        id: response.data.id,
        content: response.data.choices.map((choice: XAICompletionChoice) => ({
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

export default XAIService;
