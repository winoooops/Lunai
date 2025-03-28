import Anthropic from "@anthropic-ai/sdk";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

import { BaseAIService } from "./AIService";
import { MessageParam, Model } from "@anthropic-ai/sdk/resources";
import { MessageService } from "./message.service";
import { ChatService } from "./chat.service";
import { Message, TextContentBlock } from "@LunaiTypes/message";
import { PubSub } from "graphql-subscriptions";
import { ConfigService } from "./config.service";
import { Config } from "@LunaiTypes/config";
import { ModelService } from "./model.service";
import { ChatStreamCompleteResponseBody, ChatStreamDoneResponseBody, ChatStreamOnResponseBody } from "@LunaiTypes/response";

class AnthropicService implements BaseAIService {
  anthropicInstance: Anthropic;
  private messageService: MessageService;
  private chatService: ChatService;
  private configService: ConfigService;
  private modelService: ModelService;

  constructor(apiKey: string, messageService: MessageService, chatService: ChatService, configService: ConfigService, modelService: ModelService, baseURL?: string) {
    this.anthropicInstance = new Anthropic({
      apiKey,
      baseURL
    });
    this.messageService = messageService;
    this.chatService = chatService;
    this.configService = configService;
    this.modelService = modelService;
  }

  async createTextReplyFromConversation(prompt: string, chatId: string): Promise<Message> {
    try {
      const promptMessage: Message = {
        model: this.modelService.getActiveModelName(),
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
        ...this.configService.getConfig(),
        stream: false,
        model: this.modelService.getActiveModelName(),
        messages: ([...messages, promptMessage] as MessageParam[]), 
      })
  
      const message: Message = {
        content: response.content as TextContentBlock[],
        role: response.role,
        timestamp: new Date().toISOString(),
        id:uuidv4(),
        model: response.model,
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

  async createStreamedTextReplyFromPrompt(prompt: string, pubsub: PubSub): Promise<ChatStreamCompleteResponseBody> {
    try {
      const { id: chatId } = this.chatService.createChat({ title: prompt, messages: []});
      return this.createStreamedTextReplyFromConversation(prompt, chatId, pubsub);
    } catch (error) {
      console.error("Error when calling AnthropicService.createStreamedTextReplyFromPrompt: ", error);
      throw new Error(`Error when calling AnthropicService.createStreamedTextReplyFromPrompt: ${error}`);
    }
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

      this.messageService.addMessage(promptMessage);
      this.chatService.appendMessage(chatId, promptMessage);

      // get the previous messages
      const messages = this.chatService.getChatById(chatId)?.messages || [];

      let accumulatedContent = '';
      let finalMessage: Message;
      const messageId = uuidv4();

      const stream = await this.anthropicInstance.messages
        .stream({
          ...this.configService.getConfig(),
          model: this.modelService.getActiveModelName(),
          messages: ([...messages, promptMessage] as MessageParam[]),
        })
        .on("text", (content) => {
          accumulatedContent += content;
          pubsub.publish("MESSAGE_STREAM", {
            streamType: "message",
            streamStatus: "in_progress",
            content: [{ type: "text", text: content }],
            messageId: messageId,
            chatId
          } as ChatStreamOnResponseBody);
        })
        .on("message", (_: any) => {
          finalMessage = {
            content: [{ type: "text", text: accumulatedContent }],
            role: "assistant",
            timestamp: new Date().toISOString(),
            id: messageId,
            model: this.modelService.getActiveModelName(),
            chatId
          };
          // Publish completion event
          pubsub.publish("MESSAGE_STREAM_DONE", {
            streamType: "message",
            streamStatus: "done",
            chatId,
            finalContent: accumulatedContent,
            message: finalMessage
          } as ChatStreamDoneResponseBody);

          // Save the final message
          this.messageService.addMessage(finalMessage);
          this.chatService.appendMessage(chatId, finalMessage);
        });

      await stream.finalMessage();

      return {
        streamType: "message",
        streamStatus: "complete",
        chatId,
      } as ChatStreamCompleteResponseBody;
    } catch (error) {
      console.error("Error when calling AnthropicService.createStreamedTextReplyFromConversation: ", error);
      return {
        streamType: "message",
        streamStatus: "error",
        chatId,
        errors: error instanceof Error ? error.message : "An unknown error occurred"
      } as ChatStreamCompleteResponseBody;
    }
  }
}

export default AnthropicService;