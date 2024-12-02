import { getAIService } from "@/services/AIService";
import { MessageService } from "@/services/message.service";
import { Message } from "@LunaiTypes/message";

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
    createTextReplyFromConversation: async (_: any, { prompt, messages, chatId } : { prompt: string, messages: Message[], chatId: string } ): Promise<Message> => {
      const aiService = getAIService();
      return await aiService.createTextReplyFromConversation(prompt, messages, chatId);
    },  
    createTextReplyFromPrompt: async (_: any, { prompt }: { prompt: string }): Promise<Message> => {
      const aiService = getAIService();
      return await aiService.createTextReplyFromPrompt(prompt);
    } 
  }
}