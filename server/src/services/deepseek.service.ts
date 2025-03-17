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
import { DeepSeekCompletionResponse } from "@LunaiTypes/ds";
import { SYSTEM_PROMPT } from "@prompts/markdown";
import { StreamHandler } from "@/utils/streamHandler";
import { ChatStreamCompleteResponseBody, ChatStreamDoneResponseBody, ChatStreamOnResponseBody } from "@LunaiTypes/response";

class DeepSeekService implements BaseAIService {
  private readonly chatService: ChatService;
  private readonly client: AxiosInstance;
  private readonly configService: ConfigService;
  private readonly messageService: MessageService;
  private readonly modelService: ModelService;

  constructor(apiKey: string, messageService: MessageService, chatService: ChatService, configService: ConfigService, modelService: ModelService, baseURL?: string, model?: string) {
    this.client = axiosFactory(baseURL ?? "https://api.deepseek.com", apiKey);
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

      const messages = await this.chatService.getChatById(chatId)?.messages || [];

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

      this.messageService.addMessages([promptMessage, message]);
      this.chatService.appendMessages(chatId, [promptMessage, message]);

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

  async createStreamedTextReplyFromPrompt(prompt: string, pubsub: PubSub): Promise<ChatStreamCompleteResponseBody> {
    const {id: chatId} = this.chatService.createChat({title: prompt, messages: []});

    return this.createStreamedTextReplyFromConversation(prompt, chatId, pubsub);  
  }

  async createStreamedTextReplyFromConversation(prompt: string, chatId: string, pubsub: PubSub): Promise<ChatStreamCompleteResponseBody> {
    try {
      const promptMessage: Message = {
        model: this.modelService.getActiveModelName(),
        role: "user",
        timestamp: new Date().toISOString(),
        id: uuidv4(),
        content: [{ type: "text", text: prompt }],
        chatId
      };

      const messages = await this.chatService.getChatById(chatId)?.messages || [];
      const messageId = uuidv4();

      const response = await this.client.post("/chat/completions", {
        model: this.modelService.getActiveModelName(),
        messages: [...messages, promptMessage].map((item) => ({...item, content: item.content[0].text})),
        stream: true
      }, {
        responseType: 'stream'
      });

      const streamHandler = new StreamHandler(
        response.data, 
        pubsub, 
        (accumulatedContent, accumulatedReasoningContent) => {
          const finalMessage = {
            content: [{ type: "text", text: accumulatedContent }],
            role: "assistant",
            timestamp: new Date().toISOString(),
            id: messageId,
            model: this.modelService.getActiveModelName(),
            chatId,
            metadata: {
              reasoning_content: accumulatedReasoningContent
            }
          }

          this.messageService.addMessages([promptMessage, finalMessage]);
          this.chatService.appendMessages(chatId, [promptMessage, finalMessage]);
        },
        {
          onMessage: {
            triggerName: "MESSAGE_STREAM",
            buildPayload: (content: string): { messageStream:ChatStreamOnResponseBody } => ({
              messageStream: {
                streamType: "message",
                streamStatus: "in_progress",
                content: [{ type: "text", text: content }],
                messageId,
                chatId
              }
            })
            
          },
          onReasoningMessage: {
            triggerName: "REASONING_STREAM",
            buildPayload: (content: string): { reasoningStream: ChatStreamOnResponseBody } => ({
              reasoningStream: {
                streamType: "reasoning",
                streamStatus: "in_progress",
                content: [{ type: "text", text: content }],
                messageId,
                chatId
              }
            })
          },
          onReasoningComplete: {
            triggerName: "REASONING_STREAM_DONE",
            buildPayload: (finalContent: string): { reasoningStreamDone: ChatStreamDoneResponseBody } => ({
              reasoningStreamDone: {
                streamType: "reasoning",
                streamStatus: "done",
                content: [{ type: "text", text: finalContent }],
                chatId
              }
            })
          },
          onMessageComplete: {
            triggerName: "MESSAGE_STREAM_DONE",
            buildPayload: ({ finalContent, finalReasoningContent }: { finalContent: string, finalReasoningContent: string }): { messageStreamDone: ChatStreamDoneResponseBody } => ({
              messageStreamDone: {
                streamType: "message",
                streamStatus: "done",
                content: [{ type: "text", text: finalContent }],
                chatId,
                messageId,
                message: {
                  content: [{ type: "text", text: finalContent }],
                  role: "assistant",
                  timestamp: new Date().toISOString(),
                  id: messageId,
                  model: this.modelService.getActiveModelName(),
                  chatId,
                  metadata: {
                    reasoning_content: finalReasoningContent
                  }
                }
              }
            })
          }
        }
      );

      await streamHandler.handleStream();

      return {
        streamType: "message",
        streamStatus: "complete",
        chatId,
      };
    } catch (error) {
      console.error("Error when calling DeepSeekService.createStreamedTextReplyFromConversation: ", error);
      return {
        streamType: "message",
        streamStatus: "error",
        chatId,
        errors: error instanceof Error ? error.message : "An unknown error occurred"
      } as ChatStreamCompleteResponseBody;
    }
  }
}

export default DeepSeekService;

