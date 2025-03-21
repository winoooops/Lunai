import React, { createContext, useContext, useState } from "react";

type Position = "left" | "right";

interface SidebarContextProps {
  sidebars: SidebarInstance[];
  isAutoHide: boolean;
  leftSidebar: SidebarInstance | undefined;
  rightSidebar: SidebarInstance | undefined;
  openSidebar: (id: string, position: Position, content: React.ReactNode) => void;
  closeSidebar: (id: string) => void;
  toggleCollapse: (id: string) => void;
  onAnimationEnd: () => void;
  enableAutoHide: () => void;
  disableAutoHide: () => void;
}

export interface SidebarInstance {
  id: string;
  isOpened: boolean;
  isCollapsed: boolean;
  content: React.ReactNode;
  position: "left" | "right";
}


const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebars, setSidebars] = useState<SidebarInstance[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isAutoHide, setIsAutoHide] = useState<boolean>(true);

  const startAnimation = () => setIsAnimating(true);
  const endAnimation = () => setIsAnimating(false);

  const openSidebar = (id: string, position: Position, content: React.ReactNode) => {
    if(isAnimating) return;
    startAnimation();

    setSidebars((prev) => {
      const existingSidebar = prev.find((sidebar) => sidebar.id === id);
      if(existingSidebar) {
        return prev.map((sidebar) => sidebar.id === id ? {...sidebar, isOpened: true, position, content} : sidebar)
      }

      return [...prev, { id, isOpened: true, isCollapsed: true, position, content }];
    })
  }

  const closeSidebar = (id: string) => {
    if(isAnimating) return;

    setSidebars((prev) => prev.map((sidebar) => sidebar.id === id ? {...sidebar, isOpened: false} : sidebar));
  }

  const getSidebar = (id: string): SidebarInstance | undefined => {
    return sidebars.find((sidebar) => sidebar.id === id);
  }

  const toggleCollapse = (id: string) => {
    setSidebars((prev) => prev.map((sidebar) => sidebar.id === id ? {...sidebar, isCollapsed: !sidebar.isCollapsed} : sidebar));
  }
  
  const onAnimationEnd = () => {
    endAnimation();
  }

  const leftSidebar = getSidebar("left");
  const rightSidebar = getSidebar("right");

  const enableAutoHide = () => setIsAutoHide(true);
  const disableAutoHide = () => setIsAutoHide(false);
  

  return (
    <SidebarContext.Provider value={{
      sidebars,
      leftSidebar,
      rightSidebar,
      isAutoHide,
      enableAutoHide,
      disableAutoHide,
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