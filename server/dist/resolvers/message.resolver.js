import { MessageHandler } from "../handlers/messageHandler";
export const messageResolvers = {
    Query: {
        messages: []
    },
    Mutation: {
        getTextPrompt: async (_, { prompt }) => {
            return await MessageHandler.promptForTextReply(prompt);
        }
    }
};
