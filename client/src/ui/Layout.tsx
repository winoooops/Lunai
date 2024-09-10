import React from 'react';
import Nav from './Nav';
import MainContent from './MainContent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

	return (
		<div className="flex bg-neutral-200 dark:bg-[#252423] flex-col h-full w-full overflow-hidden justify-items-center">
			<Nav />
			<div className="flex-1 relative">
				<MainContent>{children}</MainContent>
			</div>
		</div>
		);
};

export default Layout;