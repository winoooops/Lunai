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
    `grow bg-slate-900 w-full border-r-0.5 border-slate-600 translate-transform duration-300 ease-in-out ${isCollapsed ? "rounded mb-1 mt-1 mr-1" : "rounded-sm"}` :
    "fixed top-12 right-12 h-2/3 grow bg-opacity-10 backdrop-blur-md rounded border-0.5 border-slate-200 border-solid overflow-hidden bg-gray-700"  

  return (
    <div id={id} ref={position === "left" ? elementRef: null} 
      className={`${animationStyle} ${cssStyles}`}
      onAnimationEnd={onAnimationEnd}  
    >
      {content} 
    </div> 
  );
}

export default Sidebar;