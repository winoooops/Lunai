import { GET_MESSAGES_BY_CHAT } from "../graphql/operations";
import { useQuery } from "@apollo/client";
import { Message } from "@LunaiTypes/message";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface MessageContextProps {
  messages: Message[];
  onSend: (message: string) => void;
  onClear: () => void;
}
const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageContextProvider: React.FC<{children: React.ReactNode }> = ({ children }) => {
  const { chatId } = useParams<{ chatId: string }>();

  const [messages, setMessages] = useState<Message[]>([]);

  const { loading, error, data, refetch } = useQuery(GET_MESSAGES_BY_CHAT, {
      variables: { chatId: chatId || "" },
      skip: !chatId
    });

  useEffect(() => {
    if(chatId) refetch();

    return () => setMessages([]);
  },[chatId, refetch]);  

  useEffect(() => {
    if(data && data.getChat) {
      setMessages(data.getChat.messages); 
    } 
  },[data]);


  const onSend = (content: string) => {
    // setMessages((prev) => [...prev, { isUser: true, content }]) 
  }

  const onClear = () => {
    // setMessages([]);
  }

  return (
    <MessageContext.Provider value={{
      messages,
      onSend,
      onClear
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if(!context) {
    throw new Error(`useMessageContext muse be used within a MessageContextProvider.`);
  }

  return context;
}