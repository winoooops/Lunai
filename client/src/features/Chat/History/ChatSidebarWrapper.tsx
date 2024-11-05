import { RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";
import { useSidebar } from "../../../contexts/SidebarContext";
import Button from "../../../ui/Button";
import { TbMoon2 } from "react-icons/tb";

const ChatSidebarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toggleCollapse, leftSidebar } = useSidebar();
  if(!leftSidebar) return;
  
  const { id, isCollapsed, isOpened } = leftSidebar;


  return (
    <div className="bg-slate-900 flex flex-col flex-between rounded-lg text-slate-200 p-4 h-full">
      <div className="grow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs text-bold font-semibold">All Chats</h2>
          <Button className="bg-transparent hover:bg-slate-800" onClick={() => toggleCollapse(id)}>
            { 
              isCollapsed ? <RiSidebarUnfoldLine /> : <RiSidebarFoldLine /> 
            }
          </Button>
        </div>
      {children}      
      </div>  
      <div className="transform-transition duration-300">
        <span className="inline-block">
          {
            isOpened ? <TbMoon2 /> : <RiSidebarUnfoldLine />
          }
        </span>
      </div>
    </div>
  );
}

export default ChatSidebarWrapper;