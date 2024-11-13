import React, { useState } from 'react';
import MainContent from './MainContent';
import { Dialog } from './Dialog';
import { useDialog } from '../contexts/DialogContext';
import Sidebar from './Sidebar';
import useMouseNearEdge from '../hooks/useMouseNearEdge';
import { useSidebar } from '../contexts/SidebarContext';
import ChatHistory from '../features/Chat/History/ChatHistory';
import { RiSidebarUnfoldLine } from 'react-icons/ri';
import ChatSidebarWrapper from '../features/Chat/History/ChatSidebarWrapper';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isOpen, content, } = useDialog();
	const { leftSidebar, openSidebar } = useSidebar();
	const [isHighlight, setIsHighlight] = useState<boolean>(false);

	useMouseNearEdge(!leftSidebar || !leftSidebar.isOpened, 50, () => openSidebar("left", "left", <ChatSidebarWrapper><ChatHistory /></ChatSidebarWrapper>));
	// add gradient color for ux 
	useMouseNearEdge(true, window.innerWidth * 0.2, () => setIsHighlight(true));

	const handleMouseLeave = () => setIsHighlight(false);

	return (
		<div 
			onDrop={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
			onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
			className={`flex bg-slate-800 flex-col h-full w-full overflow-hidden justify-items-center ${isHighlight ? "bg-bg-gradient" : ""}`}
		>
			<div className="flex h-full w-full">
				<div className="w-1/5 relative h-screen flex" onMouseLeave={handleMouseLeave}>
					{ !leftSidebar?.isOpened && <div className="absolute bottom-6 left-5 text-slate-200"><RiSidebarUnfoldLine /></div> }
					{ leftSidebar && <Sidebar sidebar={leftSidebar} /> }
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