import { ChatService } from "@/services/chat.service"
import { Chat, ChatParams } from "@LunaiTypes/chat";
import { PubSub } from "graphql-subscriptions";

export const chatResolvers = {
  Query: {
    chats: (): Chat[] => {
      const chatService = ChatService.getInstance();
      return chatService.getChats();
    },
    getChat: (_: any, { id } : { id: string } ): Chat | undefined => {
      const chatService = ChatService.getInstance();
      return chatService.getChatById(id);
    }
  },
  Mutation: {
    createChat(_: any, { input }: { input: ChatParams }, { pubsub }: { pubsub: PubSub }) {
      const chatService = ChatService.getInstance();
      const chatAdded = chatService.createChat(input);
      pubsub.publish('CHAT_ADDED', { chatAdded });
      return chatAdded;
    },
    updateChat(_: any, { id, input } : { id: string, input: Partial<Chat>}) {
      const chatService = ChatService.getInstance();
      return chatService.updateChat(id, input);
    },
    deleteChat(_: any, { id } : { id: string }) {
      const chatService = ChatService.getInstance();
      return chatService.deleteChat(id);
    }
  },
  Subscription: {
    chatAdded: {
      subscribe: (_: any, __: any, { pubsub }: { pubsub: PubSub }) => {
        return pubsub.asyncIterableIterator(['CHAT_ADDED']);
      }
    }
  }
}