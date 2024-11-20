import { MessageHandler } from "@/handlers/messageHandler";
import { LunaiMessage, Message } from "../types/message";

export const messageResolvers = {
  Query: {
    messages: []
  },
  Mutation:{
    getTextPrompt: async (_: any, { messages } : { messages: LunaiMessage[]} ): Promise<Message> => {
      return await MessageHandler.createTextReplyFromConversation(messages);
    }  
  }
}