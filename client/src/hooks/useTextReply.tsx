import { useChatContext } from "@/contexts/ChatContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useTextReply = () => {
  const [prompt, setPrompt] = useState<string>(""); 
  // TODO: need to be able to add attachments. i.e., pictures, code, long text contents
  const { onSendTextReply } = useChatContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(prompt.trim()) {
      onSendTextReply(prompt, (url: string) => navigate(url));
      setPrompt("");
    }
  }

  return { prompt, setPrompt, handleSubmit }
}

export default useTextReply;
