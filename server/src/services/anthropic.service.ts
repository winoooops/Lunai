import Anthropic from "@anthropic-ai/sdk";
import { v4 as uuidv4 } from "uuid";

import { BaseAIService } from "./AIService";
import { MessageParam } from "@anthropic-ai/sdk/resources";
import { MessageService } from "./message.service";
import { ChatService } from "./chat.service";
import { Message, TextContentBlock } from "@LunaiTypes/message";
import { PubSub } from "graphql-subscriptions";


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

  async createStreamedTextReplyFromPrompt(prompt: string, pubsub: PubSub): Promise<Message> {
    try {
      const { id: chatId } = this.chatService.createChat({ title: prompt, messages: []});
      
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

      this.messageService.addMessage(promptMessage);
      this.chatService.appendMessage(chatId, promptMessage);

      let accumulatedContent = '';
      const messageId = uuidv4();
      let finalMessage: Message;

      const stream = await this.anthropicInstance.messages
        .stream({
          model: "grok-beta",
          max_tokens: 128,
          system: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
          messages: [{ role: "user", content: prompt }],
        })
        .on("contentBlock", (content) => {
          accumulatedContent += content;
          pubsub.publish("MESSAGE_STREAM", {
            messageStream: {
              content: [{ type: "text", text: content }],
              role: "assistant",
              timestamp: new Date().toISOString(),
              id: messageId,
              model: "grok-beta",
              chatId
            }
          });
        })
        .on("message", (message) => {
          // Save the complete message
          console.log('message', message);
          finalMessage = {
            content: [{ type: "text", text: accumulatedContent }],
            role: "assistant",
            timestamp: new Date().toISOString(),
            id: messageId,
            model: "grok-beta",
            chatId
          };
          
          this.messageService.addMessage(finalMessage);
          this.chatService.appendMessage(chatId, finalMessage);
        });

      await stream.finalMessage();
      return finalMessage!;
    } catch (error) {
      console.error("Error when calling AnthropicService.createStreamedTextReplyFromPrompt: ", error);
      throw new Error(`Error when calling AnthropicService.createStreamedTextReplyFromPrompt: ${error}`);
    }
  }
}

export default AnthropicService;