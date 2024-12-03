import { RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";
import { useSidebar } from "../../../contexts/SidebarContext";
import Button from "../../../ui/Button";
import { FaGithub } from "react-icons/fa";

const ChatSidebarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toggleCollapse, leftSidebar } = useSidebar();
  if(!leftSidebar) return;
  
  const { id, isCollapsed, isOpened } = leftSidebar;

  const shouldShowCollapseButton = window.innerWidth > 768;

  return (
    <div className="flex flex-col flex-between rounded-lg text-slate-200 p-4 h-full">
      <div className="grow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs text-bold font-semibold">All Chats</h2>
          {
            shouldShowCollapseButton && 
            <Button className="bg-transparent hover:bg-slate-800" onClick={() => toggleCollapse(id)}>
              { 
                isCollapsed ? <RiSidebarUnfoldLine /> : <RiSidebarFoldLine /> 
              }
            </Button>
          }
        </div>
      {children}      
      </div>  
      <div className="transform-transition duration-300">
        <a href="https://github.com/winoooops/Lunai" target="_blank" className="inline-block cursor-pointer outline-none text-slate-200 hover:text-yellow-400">
          {
            isOpened ? <FaGithub /> : <RiSidebarUnfoldLine />
          }
        </a>
      </div>
    </div>
  );
}

export default ChatSidebarWrapper;