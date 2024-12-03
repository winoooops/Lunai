import { useChatContext } from "@/contexts/ChatContext";
import { CREATE_TEXT_REPLY_FROM_CONVERSATION, CREATE_TEXT_REPLY_FROM_PROMPT } from "@/graphql/operations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useTextReply = () => {
  const [prompt, setPrompt] = useState<string>(""); 
  // TODO: need to be able to add attachments. i.e., pictures, code, long text contents
  const { activeChat, refetchChat, refetchChats } = useChatContext();
  const [createTextReplyFromPrompt] = useMutation(CREATE_TEXT_REPLY_FROM_PROMPT);
  const [createTextReplyFromConversation] = useMutation(CREATE_TEXT_REPLY_FROM_CONVERSATION);
  const navigate = useNavigate();

  const onSend = async (prompt: string) => {
    if(activeChat && activeChat.messages.length > 0) {
      const { id: chatId } = activeChat;
      const { data } = await createTextReplyFromConversation({ variables: { prompt, chatId } })
      refetchChat(); 
    } else {
      const { data } = await createTextReplyFromPrompt({ variables: { prompt }})
      const incomingMsg = data.createTextReplyFromPrompt;
      if(incomingMsg.chatId) {
        // should updates the chats since new entry has been added 
        refetchChats();
        // should go to route `chat/:chatId`
        navigate(`/chat/${incomingMsg.chatId}`);
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(prompt);
    if(prompt.trim()) {
      onSend(prompt);
      setPrompt("");
    }
  }

  return { prompt, setPrompt, handleSubmit }
}

export default useTextReply;