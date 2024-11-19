import axios, { AxiosInstance } from "axios";
import { config } from "dotenv";
import { promptForTextReply } from "./messages.service";

config();

const XAI_API_KEY = process.env.XAI_API_KEY;
const BASE_URL = process.env.XAI_BASE_URL;

export class XAIService {
  client: AxiosInstance;
  model: string;

  constructor(apiKey: string, baseURL?: string, model?: string) {
    this.client = axios.create({
      baseURL: baseURL ? baseURL : "https://api.x.ai/v1",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    }) 

    this.model = model || "grok-beta";
  }

  promptForTextReply(content: string) {
    return this.client.post("/chat/completions", {
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
    })
  }
}
