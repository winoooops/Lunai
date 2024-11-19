import { promptForTextReply } from "../services/messages.service";
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
