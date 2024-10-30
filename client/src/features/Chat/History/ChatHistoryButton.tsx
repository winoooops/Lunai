import { RiHistoryLine } from "react-icons/ri";
import { DialogButton } from "../../../ui/Dialog";
import ChatHistory from "./ChatHistory";

interface ChatHistoryButtonProps {
  className: string;
}


const ChatHistoryButton: React.FC<ChatHistoryButtonProps> = ({ className }) => {
  return (
    <>
      <DialogButton 
        id="history" 
        variation="dropdown" 
        className={`p-2 ${className}`}
        content={<ChatHistory/>}>
          <RiHistoryLine />
      </DialogButton>
    </>
  );
}

export default ChatHistoryButton;