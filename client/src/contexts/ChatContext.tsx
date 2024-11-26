import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHATS } from "../graphql/operations";
import { Chat } from "@LunaiTypes/chat";

interface ChatContextProps {
  chats: Chat[];
  deleteChatById: (id: string) => void;
  editChat: (id: string, payload: Partial<Chat>) => void;
  getChatInfo: () => Chat | undefined;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, error, data } = useQuery(GET_CHATS);
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    if(data && data.chats) {
      setChats(data.chats);
    }
  },[data]);

  // Todo: should display a pending singal


  const deleteChatById = (id: string) => {
    setChats((prev) => prev.filter((chat: Chat) => chat.id !== id));
  }

  const editChat = (id: string, payload: Partial<Chat>) => {
    setChats((prev) => prev.map((chat:Chat) => chat.id === id ? {...chat, ...payload} : chat));
  }

  const getChatInfo = (): Chat | undefined => {
    const { chatId } = useParams();
    return chats.find((chat) => chat.id === chatId);
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