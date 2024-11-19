import { MessageHandler } from "@/handlers/messageHandler";
import { Message } from "../types/message";

export const messageResolvers = {
  Query: {
    messages: []
  },
  Mutation:{
    getTextPrompt: async (_: any, { prompt } : { prompt: string} ): Promise<Message> => {
      return await MessageHandler.promptForTextReply(prompt);
    }  
  }
}