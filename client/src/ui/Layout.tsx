import React, { useState } from 'react';
import MainContent from './MainContent';
import { Dialog } from './Dialog';
import { useDialog } from '../contexts/DialogContext';
import Sidebar from './Sidebar';
import useMouseNearEdge from '../hooks/useMouseNearEdge';
import { useSidebar } from '../contexts/SidebarContext';
import ChatHistory from '../features/Chat/History/ChatHistory';
import { RiSidebarUnfoldLine } from 'react-icons/ri';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isOpen, content, } = useDialog();
	const { sidebars, leftSidebar, openSidebar } = useSidebar();
	const [isHighlight, setIsHighlight] = useState<boolean>(false);

	useMouseNearEdge(!leftSidebar || !leftSidebar.isOpened, 50, () => openSidebar("left", <ChatHistory />));
	// add gradient color for ux 
	useMouseNearEdge(true, 100, () => setIsHighlight(true));

	const handleMouseLeave = () => setIsHighlight(false);

	return (
		<div 
			onDrop={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
			onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
			className={`flex flex-col bg-slate-800 dark:bg-[#252423] h-full w-full overflow-hidden justify-items-center ${isHighlight ? "highlight" : ""}`}
		>
			<div className="flex h-full w-full">
				<div className="w-1/5 relative" onMouseLeave={handleMouseLeave}>
					{ !leftSidebar?.isOpened && <div className="absolute bottom-6 left-5 text-slate-200"><RiSidebarUnfoldLine /></div> }
					{
						sidebars && sidebars.map(sidebar => <Sidebar sidebar={sidebar} />)
					}

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