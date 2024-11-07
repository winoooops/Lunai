import { Outlet } from "react-router-dom";
import { MessageContextProvider } from "../../contexts/MessageContext";
import { useSidebar } from "../../contexts/SidebarContext";
import ChatNav from "../../components/ChatNav/ChatNav";

const ChatLayout: React.FC<{}> = ({}) => {
  const { leftSidebar } = useSidebar();
  const isCollapsed = leftSidebar && leftSidebar.isCollapsed; 

  return (
    <MessageContextProvider>
      <ChatNav />
      <div className={`w-3/4 h-full ${isCollapsed ? "" : leftSidebar ?  "mx-auto": ""}`}>
        <Outlet />
      </div>
    </MessageContextProvider>
  );
}

export default ChatLayout;