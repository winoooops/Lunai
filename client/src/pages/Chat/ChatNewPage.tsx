import ChatRecent from "../../features/Chat/History/ChatRecent";
import MessageInput from "../../features/Chat/Messages/MessageInput";
import MessageLanding from "../../features/Chat/Messages/MessagesLanding";

const ChatNewPage: React.FC<{}> = ({ }) => {

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-6 flex-1">
        <MessageLanding />
        <MessageInput />
        <ChatRecent />
    </div>
  );
}

export default ChatNewPage;