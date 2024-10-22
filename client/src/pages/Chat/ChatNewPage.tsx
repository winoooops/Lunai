import { useMessageContext } from "../../contexts/MessageContext";
import ChatRecent from "../../features/Chat/History/ChatRecent";
import MessageInput from "../../features/Chat/Messages/MessageInput";
import MessageLanding from "../../features/Chat/Messages/MessagesLanding";

const ChatNewPage: React.FC<{}> = ({ }) => {
  const { onSend } = useMessageContext();

  return (
    <div className="h-full flex flex-col items-center justify-center ">
        <MessageLanding />
        <MessageInput onSendMessage={onSend}/>
        <ChatRecent />
    </div>
  );
}

export default ChatNewPage;