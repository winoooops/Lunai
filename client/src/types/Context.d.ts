import { SidebarInstance } from "../contexts/SidebarContext";

export interface SidebarContextProps {
  sidebars: SidebarInstance[];
  leftSidebar: SidebarInstance | undefined;
  openSidebar: (id: string, position, content: React.ReactNode) => void;
  closeSidebar: (id: string) => void;
  toggleCollapse: (id: string) => void;
  onAnimationEnd: () => void;
}