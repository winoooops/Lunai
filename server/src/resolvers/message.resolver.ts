import { getAIService } from "@/services/AIService";
import { ChatService } from "@/services/chat.service";
import { MessageService } from "@/services/message.service";
import { Message } from "@LunaiTypes/message";
import { ChatStreamCompleteResponseBody } from "@LunaiTypes/response";
import { PubSub } from "graphql-subscriptions";

export const messageResolvers = {
  Query: {
    messages: (): Message[] => {
      const messageService = MessageService.getInstance();
      return messageService.getMesssages(); 
    },
    messagesFromChat: (_:any, { chatId} : { chatId: string } ): Message[] => {
      const chatService = ChatService.getInstance();
      return chatService.getChatById(chatId)?.messages || [];
    }
  },
  Mutation:{
    createTextReplyFromConversation: async (_: any, { prompt, chatId } : { prompt: string, chatId: string } ): Promise<Message> => {
      const aiService = getAIService();
      return await aiService.createTextReplyFromConversation(prompt, chatId);
    },  
    createTextReplyFromPrompt: async (_: any, { prompt }: { prompt: string }): Promise<Message> => {
      const aiService = getAIService();
      return await aiService.createTextReplyFromPrompt(prompt);
    },
    createStreamedTextReplyFromPrompt: async (_: any, { prompt }: { prompt: string }, { pubsub }: { pubsub: PubSub }): Promise<ChatStreamCompleteResponseBody> => {
      const aiService = getAIService();
      return await aiService.createStreamedTextReplyFromPrompt(prompt, pubsub);
    },
    createStreamedTextReplyFromConversation: async (_: any, { prompt, chatId }: { prompt: string, chatId: string }, { pubsub }: { pubsub: PubSub }): Promise<ChatStreamCompleteResponseBody> => {
      const aiService = getAIService();
      return await aiService.createStreamedTextReplyFromConversation(prompt, chatId, pubsub);
    }
  },
  Subscription: {
    messageStream: {
      subscribe: (_: any, __: any, { pubsub }: { pubsub: PubSub }) => {
        return pubsub.asyncIterableIterator(['MESSAGE_STREAM'])
      }
    },
    messageStreamDone: {
      subscribe: (_: any, __: any, { pubsub }: { pubsub: PubSub }) => {
        return pubsub.asyncIterableIterator(['MESSAGE_STREAM_DONE'])
      }
    },
    reasoningStream: {
      subscribe: (_: any, __: any, { pubsub }: { pubsub: PubSub }) => {
        return pubsub.asyncIterableIterator(['REASONING_STREAM'])
      }
    },
    reasoningStreamDone: {
      subscribe: (_: any, __: any, { pubsub }: { pubsub: PubSub }) => {
        return pubsub.asyncIterableIterator(['REASONING_STREAM_DONE'])
      }
    }
  }
}