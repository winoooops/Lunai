export interface ChatItem {
  title: string;
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ChatContextProps {
  chats: Chat[];
  deleteChatById: (id: number) => void;
  editChat: (id: number, payload: Partial<ChatItem>) => void;
  getChatInfo: () => ChatItem | undefined;
}