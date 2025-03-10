import { useChatContext } from "@/contexts/ChatContext";
import { useState } from "react";

const useTextReply = () => {
  const [prompt, setPrompt] = useState<string>(""); 
  // TODO: need to be able to add attachments. i.e., pictures, code, long text contents
  const { onSendTextReply } = useChatContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(prompt.trim()) {
      onSendTextReply(prompt);
      setPrompt("");
    }
  }

  return { prompt, setPrompt, handleSubmit }
}

export default useTextReply;
