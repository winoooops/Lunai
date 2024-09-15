import React from 'react';
import Nav from './Nav';
import MainContent from './MainContent';
import Button from './Button';
import { RiAddLine, RiHistoryLine } from "react-icons/ri";
import MenuButton from './MenuButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

	return (
		<div className="flex bg-slate-800 dark:bg-[#252423] flex-col h-full w-full overflow-hidden justify-items-center">
			<Nav>
				<MenuButton colorScheme={{ bg: "bg-slate-800", hover:"hover:text-yellow-300", text: "text-slate-200" }} />
				<Button colorScheme={{ bg:"bg-slate-800", hover:"hover:text-yellow-300", text:"text-slate-200" }}>
					<RiAddLine />
				</Button>
				<Button colorScheme={{ bg:"bg-slate-800", hover:"hover:text-yellow-300", text:"text-slate-200" }}>
					<RiHistoryLine />
				</Button>
			</Nav>
			<MainContent>{children}</MainContent>
		</div>
		);
};

export default Layout;