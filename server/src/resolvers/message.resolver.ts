import { promptForTextReply } from "@/services/messages.service";
import { Message } from "../types/message";

export const messageResolvers = {
  Query: {
    messages: []
  },
  Mutation:{
    getTextPrompt: async (_: any, { prompt } : { prompt: string} ): Promise<Message> => {
      return await promptForTextReply(prompt);
    }  
  }
}