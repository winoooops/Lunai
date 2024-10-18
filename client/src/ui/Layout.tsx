import React from 'react';
import MainContent from './MainContent';
import { Dialog } from './Dialog';
import { useDialog } from '../contexts/DialogContext';
import NavComponent from '../components/Nav.component';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { isOpen, content, } = useDialog();

	return (
		<div 
			onDrop={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
			onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
			className="flex bg-slate-800 dark:bg-[#252423] flex-col h-full w-full overflow-hidden justify-items-center">
			<NavComponent />	
			<MainContent>
				{children}
				{ isOpen && 
					<Dialog>
						{ content }
					</Dialog>	
				}
			</MainContent>
		</div>
		);
};

export default Layout;