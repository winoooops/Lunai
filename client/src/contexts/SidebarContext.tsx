import React, { createContext, useContext, useState } from "react";
import { SidebarContextProps } from "../types/Context";

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [id, setId] = useState<string | undefined>(undefined);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = () => setIsAnimating(true);
  const endAnimation = () => setIsAnimating(false);

  const openSidebar = (targetId: string, content: React.ReactNode) => {
    if(isAnimating) return;

    startAnimation();
    if(id !== targetId) {
      setId(id);
      setContent(content);
    }
    setIsOpened(true);
  }

  const closeSidebar = () => {
    if(isAnimating) return;

    setIsOpened(false);
  }

  const toggleCollapse = () => {
    isOpened && setIsCollapsed(state => !state);
  }

  
  const onAnimationEnd = () => {
    endAnimation();
  }
  

  return (
    <SidebarContext.Provider value={{
      id,
      isOpened,
      isCollapsed,
      content,
      openSidebar,
      closeSidebar,
      toggleCollapse,
      onAnimationEnd,
    }}>
      {children}
    </SidebarContext.Provider> 
  );
} 

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if(!context) {
    throw new Error(`Please use SidebarContext within its provider.`)
  }

  return context;
}