import { Outlet } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import ChatNav from "../../components/ChatNav/ChatNav";
import Sidebar from "../../ui/Sidebar";

const ChatLayout: React.FC<{}> = ({}) => {
  const { leftSidebar } = useSidebar();
  const isCollapsed = leftSidebar && leftSidebar.isCollapsed; 
  const { rightSidebar } = useSidebar();

  return (
    <>
      <ChatNav />
      <div className={`w-3/4 h-full flex ${rightSidebar?.isOpened ? "" : "justify-center"} ${isCollapsed ? "" : leftSidebar ?  "mx-auto": ""}`}>
        <div className={`${rightSidebar?.isOpened ? "xl:w-4/5 md:w-full" : "w-full"}`}>
          <Outlet />
        </div>
      </div>
      {
        rightSidebar && <Sidebar sidebar={rightSidebar} />
      }
    </>
  );
}

export default ChatLayout;