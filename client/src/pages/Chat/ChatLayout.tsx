import { Outlet } from "react-router-dom";
import { MessageContextProvider } from "../../contexts/MessageContext";
import ChatNav from "../../components/ChatNav";
import { useSidebar } from "../../contexts/SidebarContext";

const ChatLayout: React.FC<{}> = ({}) => {
  const { isCollapsed } = useSidebar();

  return (
    <MessageContextProvider>
      <ChatNav />
      <div className={`w-3/4 h-full ${isCollapsed ? "" : "mx-auto"}`}>
        <Outlet />
      </div>
    </MessageContextProvider>
  );
}

export default ChatLayout;