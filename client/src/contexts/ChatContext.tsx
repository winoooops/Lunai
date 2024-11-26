import { createContext, useContext, useEffect, useState } from "react";
import { ChatContextProps, ChatItem } from "../types/Chat";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHATS } from "../graphql/operations";


const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, error, data } = useQuery(GET_CHATS);
  const [chats, setChats] = useState<ChatItem[]>([])

  useEffect(() => {
    if(data && data.chats) {
      setChats(data.chats);
    }
  },[data]);

  // Todo: should display a pending singal


  const deleteChatById = (id: number) => {
    setChats((prev) => prev.filter((chat: ChatItem) => chat.id !== id));
  }

  const editChat = (id: number, payload: Partial<ChatItem>) => {
    setChats((prev) => prev.map((chat:ChatItem) => chat.id === id ? {...chat, ...payload} : chat));
  }

  const getChatInfo = (): ChatItem | undefined => {
    const { chatId } = useParams();
    return chats.find((chat) => chat.id === Number(chatId));
  }

  return (
    <ChatContext.Provider value={{
      chats,
      deleteChatById,
      editChat,
      getChatInfo
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