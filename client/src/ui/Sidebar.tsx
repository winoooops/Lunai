import React from "react";
import { useSidebar } from "../contexts/SidebarContext";
import useMouseMoveOutside from "../hooks/useMouseMoveOutside";
// import useMouseMoveOutside from "../hooks/useMouseMoveOutside";

const Sidebar: React.FC = () => {
  const { isOpened, isCollapsed, content, id, closeSidebar, onAnimationEnd} = useSidebar();
  

  const { elementRef } = useMouseMoveOutside(isCollapsed, closeSidebar);

  return (
    <div id={id} ref={elementRef} 
      className={`${isOpened ? "sidebar-in" : "sidebar-out"} rounded bg-slate-800 h-full pb-4 pl-1 translate-transform duration-300 ease-in-out `}
      onAnimationEnd={onAnimationEnd}  
    >
      {content}
    </div> 
  );
}

export default Sidebar;