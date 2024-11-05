import React from "react";
import { useSidebar } from "../contexts/SidebarContext";
import useMouseMoveOutside from "../hooks/useMouseMoveOutside";
import Button from "./Button";
import { RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";
import { TbMoon2 } from "react-icons/tb";

const Sidebar: React.FC = () => {
  const { isOpened, isCollapsed, content, id, closeSidebar, onAnimationEnd, toggleCollapse } = useSidebar();

  const { elementRef } = useMouseMoveOutside(isCollapsed, closeSidebar);


  return (
    <div id={id} ref={elementRef} 
      className={`${isOpened ? "sidebar-in" : "sidebar-out"} h-full ${isCollapsed ? "rounded pl-1 pt-1 pb-1" : "rounded-sm"} bg-slate-800 translate-transform duration-300 ease-in-out`}
      onAnimationEnd={onAnimationEnd}  
    >
      <div className="bg-slate-900 flex flex-col flex-between rounded-lg text-slate-200 p-4 h-full">
        <div className="grow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs text-bold font-semibold">All Chats</h2>
            <Button className="bg-transparent hover:bg-slate-800" onClick={toggleCollapse}>
              { 
                isCollapsed ? <RiSidebarUnfoldLine /> : <RiSidebarFoldLine /> 
              }
            </Button>
          </div>
        {content}      
        </div>  
        <div className="transform-transition duration-300">
          <span className="inline-block">
            {
              isOpened ? <TbMoon2 /> : <RiSidebarUnfoldLine />
            }
          </span>
        </div>
      </div>
    </div> 
  );
}

export default Sidebar;