import { RiHistoryLine } from "react-icons/ri";
import { DialogButton } from "../../../ui/Dialog";
import ChatHistory from "./ChatHistory";

interface ChatHistoryButtonProps {
  colorScheme: {
    bg: string;
    hover: string;
    text: string;
  }
}


const ChatHistoryButton: React.FC<ChatHistoryButtonProps> = ({ colorScheme }) => {
  return (
    <>
      <DialogButton 
        id="history" 
        variation="dropdown" 
        className={`
          p-2
          ${colorScheme.bg}   
          ${colorScheme.hover}
          ${colorScheme.text}
        `}
        content={<ChatHistory/>}>
          <RiHistoryLine />
      </DialogButton>
    </>
  );
}

export default ChatHistoryButton;