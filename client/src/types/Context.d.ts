export interface SidebarContextProps {
  id: string | undefined;
  isOpened: boolean;
  isCollapsed: boolean;
  content: React.ReactNode | null;
  openSidebar: (id: string, content: React.ReactNode) => void;
  closeSidebar: () => void;
  toggleCollapse: () => void;
  onAnimationEnd: () => void;
}