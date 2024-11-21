import { MessageHandler } from "@/handlers/messageHandler";
import { Message } from "../types/message";

export const messageResolvers = {
  Query: {
    messages: []
  },
  Mutation:{
    createTextReplyFromConversation: async (_: any, { messages } : { messages: Message[]} ): Promise<Message> => {
      return await MessageHandler.createTextReplyFromConversation(messages);
    }  
  }
}