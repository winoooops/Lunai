export interface ChatItem {
  title: string;
  id: number;
  timestamp: Date;
}

export interface ChatContextProps {
  chats: Chat[];
}