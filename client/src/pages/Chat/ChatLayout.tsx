import { Outlet } from "react-router-dom";
import { MessageContextProvider } from "../../contexts/MessageContext";
import { useSidebar } from "../../contexts/SidebarContext";
import ChatNav from "../../components/ChatNav/ChatNav";
import Sidebar from "../../ui/Sidebar";

const ChatLayout: React.FC<{}> = ({}) => {
  const { leftSidebar } = useSidebar();
  const isCollapsed = leftSidebar && leftSidebar.isCollapsed; 
  const { rightSidebar } = useSidebar();

  return (
    <MessageContextProvider>
      <ChatNav />
      <div className={`w-3/4 h-full flex ${rightSidebar?.isOpened ? "" : "justify-center"} ${isCollapsed ? "" : leftSidebar ?  "mx-auto": ""}`}>
        <div className={`${rightSidebar?.isOpened ? "w-4/5" : "w-full"}`}>
          <Outlet />
        </div>
      </div>
      {
        rightSidebar && <Sidebar sidebar={rightSidebar} />
      }
    </MessageContextProvider>
  );
}

export default ChatLayout;