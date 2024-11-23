import { getAIService } from "@/services/AIService";
import { Message } from "../types/message";
import { MessageService } from "@/services/message.service";

export const messageResolvers = {
  Query: {
    messages: (): Message[] => {
      const messageService = MessageService.getInstance();
      return messageService.getMesssages(); 
    },
    messagesFromChat: (chatId: string): Message[] => {
      return [];
    }
  },
  Mutation:{
    createTextReplyFromConversation: async (_: any, { messages, chatId } : { messages: Message[], chatId: string } ): Promise<Message> => {
      const aiService = getAIService();
      return await aiService.createTextReplyFromConversation(messages, chatId);
    },  
    createTextReplyFromPrompt: async (_: any, { prompt }: { prompt: string }): Promise<Message> => {
      const aiService = getAIService();
      return await aiService.createTextReplyFromPrompt(prompt);
    } 
  }
}