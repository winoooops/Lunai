import { promptForTextReply } from "../services/anthropic.service";
export const messageResolvers = {
    Query: {
        messages: []
    },
    Mutation: {
        getTextPrompt: (prompt) => {
            return promptForTextReply(prompt);
        }
    }
};
