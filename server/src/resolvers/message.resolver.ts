import { promptForTextReply } from "../services/anthropic.service"
import { Message } from "../types/message";

export const messageResolvers = {
  Query: {
    messages: []
  },
  Mutation:{
    getTextPrompt: (prompt: string): Promise<Message> => {
      return promptForTextReply(prompt);
    }  
  }
}