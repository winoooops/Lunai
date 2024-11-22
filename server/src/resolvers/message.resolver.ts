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
    createTextReplyFromConversation: async (_: any, { messages } : { messages: Message[]} ): Promise<Message> => {
      const aiService = getAIService();
      return await aiService.createTextReplyFromConversation(messages);
    },  
    createTextReplyFromPrompt: async (_: any, { prompt }: { prompt: string }): Promise<Message> => {
      const aiService = getAIService();
      return await aiService.createTextReplyFromPromt(prompt);
    } 
  }
}