import Anthropic from "@anthropic-ai/sdk";
import { TextContentBlock } from "../types/message";
import { config } from "dotenv";

config();

const API_KEY = process.env.ANTHROPIC_API_KEY;

if(!API_KEY) {
  throw new Error("Failed to get API_KEY for Anthropic API key, plz check your .env file");
}

const anthropic = new Anthropic();

export const promptForTextReply = async (text: string) => {
  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      temperature: 0,
      system: "Respond only with short poems.",
      messages: [
        {
          "role": "user",
          "content": [
            {
              type: "text",
              text
            }
          ]
        }
      ]
    });

    return {
      id: msg.id,
      content: msg.content as TextContentBlock[],
      role: msg.role
    };
  }
  catch (error){
    throw new Error("Failed to call Anthropic API");
  }
}