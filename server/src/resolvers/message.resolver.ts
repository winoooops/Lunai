import { getAIService } from "@/services/AIService";
import { ChatService } from "@/services/chat.service";
import { MessageService } from "@/services/message.service";
import { Message } from "@LunaiTypes/message";

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
    createStreamedTextReplyFromPrompt: async (_: any, { prompt }: { prompt: string }, { pubsub }: { pubsub: any }): Promise<boolean> => {
      const aiService = getAIService();
      await aiService.createStreamedTextReplyFromPrompt(prompt, pubsub);
      return true;
    }
  },
  Subscription: {
    messageStream: {
      subscribe: (_: any, __: any, { pubsub }: { pubsub: any }) => {
        return pubsub.asyncIterator(['MESSAGE_STREAM'])
      }
    }
  }
}