import Anthropic from "@anthropic-ai/sdk";
export class AnthropicService {
    constructor(apiKey, baseURL) {
        this.anthropicInstance = new Anthropic({
            apiKey,
            baseURL
        });
    }
    async promptForTextReply(content) {
        try {
            const response = await this.anthropicInstance.messages.create({
                model: "grok-beta",
                max_tokens: 128,
                system: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
                messages: [
                    {
                        role: "user",
                        content
                    }
                ]
            });
            const message = {
                id: response.id,
                content: response.content,
                role: response.role
            };
            return message;
        }
        catch (error) {
            console.error("Error when calling Anthropic message prompt: ", error);
            throw new Error("Error when calling Anthropic message prompt");
        }
    }
}
