import React from 'react';
import MainContent from './MainContent';
import { Dialog } from './Dialog';
import { useDialog } from '../contexts/DialogContext';
import Sidebar from './Sidebar';
import useMouseNearEdge from '../hooks/useMouseNearEdge';
import { useSidebar } from '../contexts/SidebarContext';
import ChatHistory from '../features/Chat/History/ChatHistory';
// import { useSidebar } from '../contexts/SidebarContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isOpen, content, } = useDialog();
	const { openSidebar, isOpened } = useSidebar();
	useMouseNearEdge(!isOpened, 50, () => openSidebar("menu", <ChatHistory />) );

	return (
		<div 
			onDrop={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
			onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
			className="flex flex-col bg-slate-800 dark:bg-[#252423] h-full w-full overflow-hidden justify-items-center"
		>
			<div className="flex h-full w-full">
				<div className="w-1/5">
					<Sidebar />
				</div>
				<div className={`flex w-4/5`}>
					<MainContent>
						{children}
						{ isOpen && 
							<Dialog>
								{ content }
							</Dialog>	
						}
					</MainContent>
				</div>
			</div>	
		</div>
		);
};

export default Layout;