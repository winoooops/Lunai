import { useChatContext } from "@/contexts/ChatContext";
import ChatRecent from "../../features/Chat/History/ChatRecent";
import MessageInput from "../../features/Chat/Messages/MessageInput";
import MessageLanding from "../../features/Chat/Messages/MessagesLanding";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatNewPage: React.FC<{}> = ({ }) => {
  const { focusChat, activeChatId } = useChatContext();
  const navigate = useNavigate();

  useEffect(() => {
    // focus the new chat
    focusChat("");
  },[])

  useEffect(() => {
    if(activeChatId) {
      focusChat(activeChatId);
      navigate(`/chat/${activeChatId}`);
    }
  }, [activeChatId])


  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-6 flex-1">
        <MessageLanding />
        <MessageInput />
        <ChatRecent />
    </div>
  );
}

export default ChatNewPage;