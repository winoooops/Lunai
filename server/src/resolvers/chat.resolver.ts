import { ChatService } from "@/services/chat.service"
import { Chat, ChatParams } from "@LunaiTypes/chat";

export const chatResolvers = {
  Query: {
    chats: (): Chat[] => {
      const chatService = ChatService.getInstance();
      return chatService.getChats();
    },
    getChat: (chatId: string): Chat | undefined => {
      const chatService = ChatService.getInstance();
      return chatService.getChatById(chatId);
    }
  },
  Mutation: {
    createChat(_: any, { input }: { input: ChatParams }) {
      const chatService = ChatService.getInstance();
      return chatService.createChat(input);
    },
    updateChat(_: any, { id, input } : { id: string, input: Partial<Chat>}) {
      const chatService = ChatService.getInstance();
      return chatService.updateChat(id, input);
    },
    deleteChat(_: any, { id } : { id: string }) {
      const chatService = ChatService.getInstance();
      return chatService.deleteChat(id);
    }
  }
}