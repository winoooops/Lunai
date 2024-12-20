import { useChatContext } from "../../../contexts/ChatContext";
import ChatCard from "./ChatCard";

const ChatRecent: React.FC<{}> = ({}) => {
  const { chats } = useChatContext();

  return (
    <div className="rounded-lg text-slate-200 flex-col items-center px-1 max-w-[80%] mx-auto">
      <h2 className="text-xs text-bold mb-4 font-semibold">Recent Chats</h2>
      <div className="grid grid-cols-2 gap-3">
      {
        chats.length > 0 && (
          chats.map((chat, index) => (
            <ChatCard key={index} chat={chat}/>
          ))
        )
      }
      </div>
    </div>  
  );
}

export default ChatRecent;