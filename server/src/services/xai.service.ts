import { AxiosInstance, AxiosResponse, isAxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";

import { BaseAIService } from "./AIService";
import { MessageService } from "./message.service";
import { ChatService } from "./chat.service";
import { GraphQLError } from "graphql";
import { Message } from "@LunaiTypes/message";
import { XAIChatCompletionParams, XAICompletionResponse } from "@LunaiTypes/xai";
import { PubSub } from "graphql-subscriptions";
import { ConfigService } from "./config.service";
import { ModelService } from "./model.service";
import { axiosFactory } from "@/utils/axiosFactory";
import { StreamOperationResult } from "@LunaiTypes/service";
import { ChatStreamCompleteResponseBody } from "@LunaiTypes/response";

class XAIService implements BaseAIService {
  private client: AxiosInstance;
  private messageService: MessageService;
  private chatService: ChatService;
  private configService: ConfigService;
  private modelService: ModelService;

  constructor(apiKey: string, messageService: MessageService, chatService: ChatService, configService: ConfigService, modelService: ModelService, baseURL?: string, model?: string) {
    this.client = axiosFactory(baseURL? baseURL : "https://api.x.ai/v1", apiKey);

    this.messageService = messageService; 
    this.chatService = chatService;
    this.configService = configService;
    this.modelService = modelService;
  }
  createStreamedTextReplyFromPrompt(prompt: string, pubsub: PubSub): Promise<ChatStreamCompleteResponseBody> {
    throw new Error("Method not implemented.");
  }

  async createTextReplyFromConversation(prompt: string, chatId: string): Promise<Message>{
    try {
      const promptMessage: Message = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        role: "user",
        model: this.modelService.getActiveModelName(),
        content: [
          {
            text: prompt,
            type: "text"
          }
        ],
        chatId
      }; 

      // add the prompt message to messageService 
      this.messageService.addMessage(promptMessage);

      // get the previous messages
      const messages = this.chatService.getChatById(chatId)?.messages || []; 

      const response = await this.client.post<XAIChatCompletionParams, AxiosResponse<XAICompletionResponse>>("/chat/completions", {
        messages: [
          {
            role: "system",
            content: this.configService.getConfig().system
          },
          [
            ...messages.map(message => ({
              role: message.role,
              content: message.content[0].text
            })),
            promptMessage
          ]
        ],
        model: this.modelService.getActiveModelName(),
        ...this.configService.getConfig(),
        stream: false
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
      // this.chatService.updateChat(chatId, { messages: [...messages, promptMessage, message]})
      this.chatService.appendMessage(chatId, promptMessage);
      this.chatService.appendMessage(chatId, message);

      return message;
    } catch (error) {
      if(isAxiosError(error)) {
        const status = error.response?.status;
        const statusText = error.response?.statusText;
        const data = error.response?.data;

        let errorMessage = "An unexpected error occurred";
        // Extract the specific message from the HTML response
        if (data && typeof data === 'string') {
          const match = data.match(/<p>(.*?)<\/p>/);
          if (match && match[1]) {
            errorMessage = match[1]; // Extracted message
          }
        }

        if(data && typeof data == "object") {
          errorMessage = data.error;
        }

        throw new GraphQLError(`Error occured - [${status} | ${statusText}]: ${errorMessage}`)
      }
      throw new GraphQLError(`error occured: ${error}`);
    }
  }

  async createTextReplyFromPrompt(prompt: string): Promise<Message> {
    // Create a new chat instance since no chatId is provided
    const {id: chatId} = this.chatService.createChat({ title: prompt, messages: [] });


    // Generate a text reply based on the newly created chat
    return this.createTextReplyFromConversation(prompt, chatId);
  }

  async createStreamedTextReplyFromConversation(prompt: string, chatId: string, pubsub: PubSub): Promise<ChatStreamCompleteResponseBody> {
    throw new Error("Method not implemented.");
  }
}

export default XAIService;