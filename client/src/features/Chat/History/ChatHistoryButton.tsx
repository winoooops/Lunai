import { RiHistoryLine } from "react-icons/ri";
import ChatHistory from "./ChatHistory";
import Button from "../../../ui/Button";
import { useSidebar } from "../../../contexts/SidebarContext";

interface ChatHistoryButtonProps {
  className: string;
}


const ChatHistoryButton: React.FC<ChatHistoryButtonProps> = ({ className }) => {
  const { openSidebar } = useSidebar();

  const onClick = () => {
    openSidebar("chat-history", "left", <ChatHistory />);
  }

  return (
    <Button 
      className={`${className}`}
      onClick={onClick}   
    >
      <RiHistoryLine />
    </Button>
  );
}

export default ChatHistoryButton;