import { useState, useEffect } from 'react';
import { Message } from '@LunaiTypes/message';

interface UseMessageStreamingProps {
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  localMessages: Message[];
  setLocalMessages: (messages: Message[]) => void;
  messageStreamData: any;
  messageStreamCompleteData: any;
}

export const useMessageStreaming = ({
  activeChatId,
  setActiveChatId,
  setLocalMessages,
  messageStreamData,
  messageStreamCompleteData
}: UseMessageStreamingProps) => {
  const [pendingText, setPendingText] = useState<{ text: string, chatId: string }>({ text: "", chatId: "" });

  // Handle ongoing message stream
  useEffect(() => {
    if(messageStreamData?.messageStream) {
      const chatId = messageStreamData.messageStream.chatId;
      if (!activeChatId && chatId) {
        window.history.pushState({}, '', `/chat/${chatId}`);
        setActiveChatId(chatId);
      }
      
      setPendingText((prev) => ({
        chatId: prev.chatId ? prev.chatId : chatId ?? "",
        text: prev.text + (messageStreamData.messageStream?.content?.[0]?.text ?? "")
      }));
    }
  }, [messageStreamData]);

  // Handle message stream completion
  useEffect(() => {
    if(messageStreamCompleteData?.messageStreamComplete) {
      const { chatId, message } = messageStreamCompleteData.messageStreamComplete;
      if(chatId === activeChatId) {
        setLocalMessages(prev => {
          const filteredMessages = prev.filter(msg => msg.id !== "temp-id");
          return [...filteredMessages, message];
        });
        setPendingText({ chatId: "", text: "" });
      }
    }
  }, [messageStreamCompleteData]);

  return { pendingText };
};