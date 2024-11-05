import React from "react";
import { SidebarInstance, useSidebar } from "../contexts/SidebarContext";
import useMouseMoveOutside from "../hooks/useMouseMoveOutside";

export type SidebarProps = {
  sidebar: SidebarInstance;
}


const Sidebar: React.FC<SidebarProps> = ({ sidebar }) => {
  const { id, content, isCollapsed, isOpened, position } = sidebar;
  const { closeSidebar, onAnimationEnd } = useSidebar();
  const { elementRef } = useMouseMoveOutside(isCollapsed, () => closeSidebar(id));

  const animationStyle = position === "left" ? 
    isOpened ? "sidebar-left-in" : "sidebar-left-out" :
    isOpened ? "sidebar-right-in" : "sidebar-right-out"; 


  return (
    <div id={id} ref={elementRef} 
      className={`${animationStyle} h-full ${isCollapsed ? "rounded pl-1 pt-1 pb-1" : "rounded-sm"} bg-slate-800 translate-transform duration-300 ease-in-out`}
      onAnimationEnd={onAnimationEnd}  
    >
      {content} 
    </div> 
  );
}

export default Sidebar;