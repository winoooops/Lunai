import axios from "axios";
import { config } from "dotenv";
config();
const XAI_API_KEY = process.env.XAI_API_KEY;
const BASE_URL = process.env.XAI_BASE_URL;
export class XAIService {
    constructor(apiKey, baseURL, model) {
        this.client = axios.create({
            baseURL: baseURL ? baseURL : "https://api.x.ai/v1",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });
        this.model = model || "grok-beta";
    }
    async promptForTextReply(content) {
        try {
            const response = await this.client.post("/chat/completions", {
                messages: [
                    {
                        role: "system",
                        content: "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy."
                    },
                    {
                        role: "user",
                        content
                    }
                ],
                model: this.model,
                stream: false,
                temperature: 0
            });
            const message = {
                id: response.data.id,
                content: response.data.choices.map((choice) => ({
                    type: "text",
                    text: choice.message.content
                })),
                role: response.data.choices[0].message.role
            };
            return message;
        }
        catch (error) {
            console.error("Error calling XAIService.promptForTextReply: ", error);
            throw new Error(`Error calling XAIService.promptForTextReply: ${error}`);
        }
    }
}
