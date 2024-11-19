import { config } from 'dotenv';

import { Message } from "@/types/message";
import { AnthropicService } from "@/services/Anthropic.service";
import { XAIService } from "@/services/Xai.service";

config();

const API_KEY = process.env.XAI_API_KEY;
const BASE_URL = process.env.XAI_BASE_URL;
const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL; 

if(!API_KEY) {
  throw new Error("Failed to load API key from .env file, plz double check the file.");
}

export interface BaseAIService {
  promptForTextReply(text: string): Promise<Message>;
}

export const getAIService = (): BaseAIService => {
  if(ANTHROPIC_BASE_URL) {
    return new AnthropicService(API_KEY, ANTHROPIC_BASE_URL);
  } 

  return new XAIService(API_KEY, BASE_URL);
}