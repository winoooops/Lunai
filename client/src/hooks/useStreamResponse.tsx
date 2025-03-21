import { useSubscription } from "@apollo/client";

import { OnMessageStreamDoneDocument, OnMessageStreamDocument, OnReasoningStreamDocument, OnReasoningStreamDoneDocument } from "@/graphql/generated/graphql";
import { useState, useEffect } from "react";
import { Message } from "@LunaiTypes/message";


export const useStreamResponse = (activeChatId: string, setActiveChatId: React.Dispatch<React.SetStateAction<string>>, setLocalMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
  // used to store the streamed text reply from the conversation with the chatId
  const [pendingText, setPendingText] = useState<{ text: string, chatId: string }>({ text: "", chatId: "" });
  // used to store the streamed reasoning from the conversation with the chatId and messageId
  const [pendingReasoning, setPendingReasoning] = useState<{ text: string, chatId: string, messageId: string }>({ text: "", chatId: "", messageId: "" });

  const { data: messageStreamData, error: messageStreamError } = useSubscription(OnMessageStreamDocument);
  const { data: messageStreamDoneData, error: messageStreamDoneError } = useSubscription(OnMessageStreamDoneDocument);
  const { data: reasoningStreamData, error: reasoningStreamError } = useSubscription(OnReasoningStreamDocument);
  const { data: reasoningStreamDoneData, error: reasoningStreamDoneError } = useSubscription(OnReasoningStreamDoneDocument);


  /**
   * when the message stream data is updated, update the pending text
   * if the active chat id is not set, set the active chat id to the chat id in the message stream data
   */
  useEffect(() => {
    if(messageStreamData?.messageStream) {
      console.log(messageStreamData.messageStream); 
      const chatId = messageStreamData.messageStream?.chatId ?? "";
      if(!activeChatId && chatId) {
        setActiveChatId(chatId);
      }

      setPendingText((prev) => ({
        chatId: prev.chatId ? prev.chatId : chatId,
        text: prev.text + (messageStreamData.messageStream?.content?.[0]?.text ?? "")
      }));
    }
  }, [messageStreamData, activeChatId, setActiveChatId]);


  /**
   * when the message stream done data is updated, update the local messages
   * if the chat id is the same as the active chat id, clear the pending text
   */
  useEffect(() => {
    if(messageStreamDoneData?.messageStreamDone) {
      console.log(messageStreamDoneData.messageStreamDone);
      const { chatId, message } = messageStreamDoneData.messageStreamDone;

      setLocalMessages(prev => [...prev, message as Message]);

      if(chatId === activeChatId) {
        setPendingText({ chatId: "", text: "" });
      }
    }
  }, [messageStreamDoneData, activeChatId, setLocalMessages, setPendingText])


  useEffect(() => {
    if(reasoningStreamData?.reasoningStream){
      console.log(reasoningStreamData.reasoningStream);
      const chatId = reasoningStreamData.reasoningStream?.chatId ?? "";
      if(!activeChatId && chatId) {
        setActiveChatId(chatId);
      }

      setPendingReasoning((prev) => ({
        chatId: prev.chatId ? prev.chatId : chatId,
        text: prev.text + (reasoningStreamData.reasoningStream?.content?.[0]?.text ?? ""),
        messageId: reasoningStreamData.reasoningStream?.messageId ?? ""
      }));
    }
  }, [reasoningStreamData, activeChatId, setActiveChatId, setPendingReasoning])
  
  
  useEffect(() => {
    if(reasoningStreamDoneData?.reasoningStreamDone) {
      console.log(reasoningStreamDoneData.reasoningStreamDone);
      const { chatId } = reasoningStreamDoneData.reasoningStreamDone;
      if(chatId === activeChatId) {
        setPendingReasoning({ chatId: "", text: "", messageId: "" });
      }
    }
  }, [reasoningStreamDoneData, activeChatId, setPendingReasoning])

  // TODO: will replace this with a Toast
  if(messageStreamError) {
    console.error(messageStreamError);
  }

  if(messageStreamDoneError) {
    console.error(messageStreamDoneError);
  }

  if(reasoningStreamError) {
    console.error(reasoningStreamError);
  }

  if(reasoningStreamDoneError) {
    console.error(reasoningStreamDoneError);
  }

  return { pendingText, pendingReasoning, setPendingText, setPendingReasoning };
}