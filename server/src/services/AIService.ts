import { config } from 'dotenv';

import AnthropicService from './anthropic.service';
import XAIService from './xai.service';
import { MessageService } from './message.service';
import { ChatService } from './chat.service';
import { Message } from '@LunaiTypes/message';
import { PubSub } from "graphql-subscriptions";

config();

const API_KEY = process.env.XAI_API_KEY;
const BASE_URL = process.env.XAI_BASE_URL;
const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL; 

if(!API_KEY) {
  throw new Error("Failed to load API key from .env file, plz double check the file.");
}

export interface BaseAIService {

  /**
   * Generates a text reply based on an array of existing conversation messages. This method sends
   * a request to the API and processes the response to construct a new ChatMessage object,
   * which is then added to the message service.
   * 
   * @param {string} prompt The input text prompt from the user.
   * @returns {Promise<ChatMessage>} A Promise that resolves to the generated ChatMessage object.
   */

  createTextReplyFromConversation(prompt: string, chatId: string): Promise<Message>;
  /**
   * Creates a text reply from a prompt message. Since the prompt message does not have a chatId (No Chat was estalished),
   * a new chat instance is created first. The prompt message is then added to the message service,
   * and a reply is generated based on the new chat.
   * 
   * @param {string} prompt The input text prompt from the user.
   * @returns {Promise<PromptMessage>} A Promise that resolves to the generated PromptMessage object.
   */
  createTextReplyFromPrompt(prompt: string): Promise<Message>;

  /**
   * Creates a streamed text reply from a prompt message.
   * 
   * @param {string} prompt The input text prompt from the user.
   * @param {PubSub} pubsub The PubSub instance to publish the streamed message to.
   * @returns {Promise<Message>} A Promise that resolves to the finalized generated Message object.
   */
  createStreamedTextReplyFromPrompt(prompt: string, pubsub: PubSub): Promise<Message>;

  /**
   * Creates a streamed text reply from a conversation.
   * 
   * @param {string} prompt The input text prompt from the user.
   * @param {string} chatId The chatId of the conversation.
   * @param {PubSub} pubsub The PubSub instance to publish the streamed message to.
   * @returns {Promise<Message>} A Promise that resolves to the finalized generated Message object.
   */
  createStreamedTextReplyFromConversation(prompt: string, chatId: string, pubsub: PubSub): Promise<Message>;
}

export const getAIService = (): BaseAIService => {
  if(ANTHROPIC_BASE_URL) {
    return new AnthropicService(API_KEY, MessageService.getInstance(), ChatService.getInstance(), ANTHROPIC_BASE_URL);
  } 

  return new XAIService(API_KEY, MessageService.getInstance(), ChatService.getInstance(), BASE_URL);
}