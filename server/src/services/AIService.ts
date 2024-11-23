import { config } from 'dotenv';

import AnthropicService from './anthropic.service';
import XAIService from './xai.service';
import { MessageService } from './message.service';
import { Message } from '@/types/message';
import { ChatService } from './chat.service';

config();

const API_KEY = process.env.XAI_API_KEY;
const BASE_URL = process.env.XAI_BASE_URL;
const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL; 

if(!API_KEY) {
  throw new Error("Failed to load API key from .env file, plz double check the file.");
}

export interface BaseAIService {
  createTextReplyFromConversation(messages: Message[], chatId: string): Promise<Message>;
  createTextReplyFromPrompt(prompt: string): Promise<Message>;
}

export const getAIService = (): BaseAIService => {
  if(ANTHROPIC_BASE_URL) {
    return new AnthropicService(API_KEY, MessageService.getInstance(), ChatService.getInstance(), ANTHROPIC_BASE_URL);
  } 

  return new XAIService(API_KEY, MessageService.getInstance(), ChatService.getInstance(), BASE_URL);
}