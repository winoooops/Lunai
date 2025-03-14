import { v4 as uuidv4 } from "uuid"
import { Chat, ChatParams } from "@LunaiTypes/chat";
import { Message } from "@LunaiTypes/message";

export class ChatService {
  private static instance: ChatService;
  private chatMap: Map<string, Chat> = new Map();
  
  // static method to get the single instance of ChatService
  static getInstance(): ChatService {
    if(!ChatService.instance) {
      ChatService.instance = new ChatService();
    }

    return ChatService.instance;
  }

  getChats(): Chat[] {
    return Array.from(this.chatMap.values());
  }

  getChatById(id: string): Chat | undefined {
    return this.chatMap.get(id);
  }

  createChat(input: ChatParams): Chat {
    const newChat: Chat = {
      id: uuidv4(), 
      title: input.title,
      messages: input.messages,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    this.chatMap.set(newChat.id, newChat);

    return newChat;
  }

  deleteChat(id: string): boolean {
    return this.chatMap.delete(id);
  }

  updateChat(id: string, payload: Partial<Chat>): Chat | undefined {
    const target = this.getChatById(id);

    if(!target) {
      return;
    }

    const updated:Chat = {...target, ...payload, updated_at: new Date().toISOString()};

    this.chatMap.set(id, updated);

    return updated;
  }

  appendMessage(id: string, message: Message): Chat | undefined {
    const target = this.getChatById(id);

    if(!target) return;

    target.messages.push(message); 

    return target;
  }

  appendMessages(id: string, messages: Message[]): Chat | undefined {
    const target = this.getChatById(id);

    if(!target) return;

    target.messages.push(...messages);

    return target;
  }
}