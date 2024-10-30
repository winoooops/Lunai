export interface Message {
  isUser: boolean;
  content: string;
}

export interface MessageContextProps {
  messages: Message[];
  onSend: (message: string) => void;
  onClear: () => void;
}
