export interface TextContentBlock {
  type: string;
  text: string;
}

export interface Message {
  content: TextContentBlock[];
  role: string;
  timestamp: string;
  id: string;
  model: string; 
  chatId: string;
  metadata?: Record<string, any>;
}

export interface MessageStream {
  chatId: string;
  content: TextContentBlock[];
  messageId: string;
}

export interface MessageStreamComplete {
  chatId: string;
  finalContent: string;
  message: Message;
}

export interface ReasoningStream {
  chatId: string;
  content: TextContentBlock[];
  messageId: string;
}

export interface ReasoningStreamComplete {
  chatId: string;
  finalContent: string;
}