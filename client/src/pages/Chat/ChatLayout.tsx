import { Outlet } from "react-router-dom";
import { MessageContextProvider } from "../../contexts/MessageContext";
import ChatNav from "../../components/ChatNav";

const ChatLayout: React.FC<{}> = ({}) => {
  return (
    <MessageContextProvider>
      <ChatNav />
      <Outlet />
    </MessageContextProvider>
  );
}

export default ChatLayout;