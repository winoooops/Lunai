import React from "react";
import { SidebarInstance, useSidebar } from "../contexts/SidebarContext";
import useMouseMoveOutside from "../hooks/useMouseMoveOutside";

export type SidebarProps = {
  sidebar: SidebarInstance;
}


const Sidebar: React.FC<SidebarProps> = ({ sidebar }) => {
  const { id, content, isCollapsed, isOpened, position } = sidebar;
  const { closeSidebar, onAnimationEnd, isAutoHide } = useSidebar();
  const { elementRef } = useMouseMoveOutside(isCollapsed, () => closeSidebar(id), isAutoHide);

  const animationStyle = position === "left" ? 
    isOpened ? "sidebar-left-in" : "sidebar-left-out" : 
    isOpened ? "sidebar-right-in" : "sidebar-right-out"; 
  
  const cssStyles = position === "left" ? 
    `sidebar-left h-full ${isCollapsed ? "rounded-lg" : "rounded-sm h-full"}` :
    "fixed top-12 right-12 h-2/3 grow bg-opacity-10 backdrop-blur-md rounded border-0.5 border-slate-200 border-solid overflow-hidden bg-gray-700"  

  return (
    <div id={id} ref={position === "left" ? elementRef: null} 
      className={`${cssStyles} ${animationStyle} `}
      onAnimationEnd={onAnimationEnd}  
    >
      {content} 
    </div> 
  );
}

export default Sidebar;