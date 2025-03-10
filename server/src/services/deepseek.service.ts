import { v4 as uuidv4 } from "uuid";

import { axiosFactory } from "@/utils/axiosFactory";
import { BaseAIService } from "./AIService";
import { ChatService } from "./chat.service";
import { MessageService } from "./message.service";
import { AxiosInstance } from "axios";
import { ConfigService } from "./config.service";
import { ModelService } from "./model.service";
import { PubSub } from "graphql-subscriptions";
import { Message } from "@LunaiTypes/message";
import { DeepSeekCompletionResponse, DeepSeekStreamResponse } from "@LunaiTypes/ds";
import { SYSTEM_PROMPT } from "@prompts/markdown";
import { StreamOperationResult } from "@LunaiTypes/service";

class DeepSeekService implements BaseAIService {
  private client: AxiosInstance;
  private messageService: MessageService;
  private chatService: ChatService;
  private configService: ConfigService;
  private modelService: ModelService;

  constructor(apiKey: string, messageService: MessageService, chatService: ChatService, configService: ConfigService, modelService: ModelService, baseURL?: string, model?: string) {
    this.client = axiosFactory(baseURL? baseURL : "https://api.deepseek.com", apiKey);
    this.messageService = messageService;
    this.chatService = chatService;
    this.configService = configService;
    this.modelService = modelService;
  }

  private generateSystemPromptMessage(chatId: string): Message {
    return {
      role: "system",
      content: [{type: "text", text: SYSTEM_PROMPT}],
      timestamp: new Date().toISOString(),
      id: uuidv4(),
      model: this.modelService.getActiveModelName(),
      chatId
    }
  }
  async createTextReplyFromConversation(prompt: string, chatId: string): Promise<Message> {
    try {
      const promptMessage: Message = {
        model: this.modelService.getActiveModelName(),
        role: "user",
        timestamp: new Date().toISOString(),
        id: uuidv4(),
        content: [{ type: "text", text: prompt }],
        chatId
      }

      this.messageService.addMessage(promptMessage);

      const messages = this.chatService.getChatById(chatId)?.messages || [];

      const response = await this.client.post<DeepSeekCompletionResponse>("/chat/completions", {
        model: this.modelService.getActiveModelName(),
        messages: [this.generateSystemPromptMessage(chatId), ...messages, promptMessage].map((item) => ({...item, content: item.content[0].text})),
        stream: false
      })

      const message: Message = {
        content: [{type: "text", text: response.data.choices[0].message.content}],
        role: "assistant",
        timestamp: new Date().toISOString(),
        id: uuidv4(),
        model: response.data.model,
        chatId
      }

      this.messageService.addMessage(message);

      this.chatService.appendMessage(chatId, promptMessage);
      this.chatService.appendMessage(chatId, message);

      return message;
    } catch (error) {
      console.error("Error when calling DeepSeekService.createTextReplyFromConversation: ", error);
      throw new Error(`Error when calling DeepSeekService.createTextReplyFromConversation: ${error}`);
    }
  }

  async createTextReplyFromPrompt(prompt: string): Promise<Message> {
    const {id: chatId} = this.chatService.createChat({title: prompt, messages: []});

    return this.createTextReplyFromConversation(prompt, chatId);
  }

  async createStreamedTextReplyFromPrompt(prompt: string, pubsub: PubSub): Promise<StreamOperationResult> {
    const {id: chatId} = this.chatService.createChat({title: prompt, messages: []});

    return this.createStreamedTextReplyFromConversation(prompt, chatId, pubsub);  
  }

  async createStreamedTextReplyFromConversation(prompt: string, chatId: string, pubsub: PubSub): Promise<StreamOperationResult> {
    try {
      const promptMessage: Message = {
        model: this.modelService.getActiveModelName(),
        role: "user",
        timestamp: new Date().toISOString(),
        id: uuidv4(),
        content: [{ type: "text", text: prompt }],
        chatId
      };

      this.messageService.addMessage(promptMessage);
      this.chatService.appendMessage(chatId, promptMessage);

      const messages = this.chatService.getChatById(chatId)?.messages || [];

      let accumulatedContent = '';
      let accumulatedReasoningContent = '';
      let finalMessage: Message;
      const messageId = uuidv4();

      const response = await this.client.post("/chat/completions", {
        model: this.modelService.getActiveModelName(),
        messages: [this.generateSystemPromptMessage(chatId), ...messages, promptMessage].map((item) => ({...item, content: item.content[0].text})),
        stream: true
      }, {
        responseType: 'stream'
      });

      for await (const chunk of response.data) {
        const lines = chunk.toString().split('\n').filter(Boolean);
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              // Publish both completion events when stream is done
              pubsub.publish("REASONING_STREAM_COMPLETE", {
                reasoningStreamComplete: {
                  chatId,
                  finalContent: accumulatedReasoningContent
                }
              });

              // Save the final message
              finalMessage = {
                content: [{ type: "text", text: accumulatedContent }],
                role: "assistant",
                timestamp: new Date().toISOString(),
                id: messageId,
                model: this.modelService.getActiveModelName(),
                chatId,
                metadata: {
                  reasoning_content: accumulatedReasoningContent
                }
              };

              pubsub.publish("MESSAGE_STREAM_COMPLETE", {
                messageStreamComplete: {
                  chatId,
                  finalContent: accumulatedContent,
                  message: finalMessage 
                }
              });

              this.messageService.addMessage(finalMessage);
              this.chatService.appendMessage(chatId, finalMessage);

              continue;
            }

            const parsedData: DeepSeekStreamResponse = JSON.parse(data);
            if (parsedData.choices && parsedData.choices.length > 0) {
              const { content = '', reasoning_content = '' } = parsedData.choices[0].delta;
              
              if (reasoning_content) {
                accumulatedReasoningContent += reasoning_content;
                pubsub.publish("REASONING_STREAM", {
                  reasoningStream: {
                    content: [{ type: "text", text: reasoning_content }],
                    messageId: messageId,
                    chatId
                  }
                });
              }

              if (content) {
                accumulatedContent += content;
                pubsub.publish("MESSAGE_STREAM", {
                  messageStream: {
                    content: [{ type: "text", text: content }],
                    messageId: messageId,
                    chatId
                  }
                });
              }
            }
          }
        }
      }

      return {
        success: true,
        chatId,
        error: undefined
      };
    } catch (error) {
      console.error("Error when calling DeepSeekService.createStreamedTextReplyFromConversation: ", error);
      throw new Error(`Error when calling DeepSeekService.createStreamedTextReplyFromConversation: ${error}`);
    }
  }
}

export default DeepSeekService;

