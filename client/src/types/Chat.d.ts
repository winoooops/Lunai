export interface ChatItem {
  title: string;
  id: number;
  timestamp: Date;
}

export interface ChatContextProps {
  chats: Chat[];
  deleteChatById: (id: number) => void;
  editChat: (id: number, payload: Partial<ChatItem>) => void;
  getChatInfo: () => ChatItem | undefined;
}