import { Message } from "./message";

export interface Chat {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export interface ChatParams {
  title: string;
  messages: Message[];
}

