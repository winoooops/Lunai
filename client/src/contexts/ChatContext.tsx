import { createContext, useContext, useState } from "react";
import { ChatContextProps, ChatItem } from "../types/Chat";

const items: ChatItem[] = [
    {title: "I need help with my tax", id: 1, timestamp: new Date(Date.now() - 1000 * 60 * 10)},
    {title: "can you sort out this json file for me? I am using it in my react application to define tailwind config", id: 2, timestamp: new Date(Date.now() - 1000 * 60 * 60)},
    {title: "What is the best way to learn React?", id: 3, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
];


const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<ChatItem[]>(items)

  return (
    <ChatContext.Provider value={{
      chats
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if(!context) {
    throw new Error(`useChatContext must be used within ChatContextProvider.`);
  }

  return context;
}