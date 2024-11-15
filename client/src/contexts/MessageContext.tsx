import React, { createContext, useContext, useState } from "react";
import { Message, MessageContextProps } from "../types/Message";

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageContextProvider: React.FC<{children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const onSend = (content: string) => {
    setMessages((prev) => [...prev, { isUser: true, content }]) 
  }

  const onClear = () => {
    setMessages([]);
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