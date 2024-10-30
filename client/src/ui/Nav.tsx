import React from 'react';

interface NavProps {
  children: React.ReactNode;
}


const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <nav className="z-[100] w-full pl-4 bg-slate-800">
      <ul className="flex items-center justify-between">
        {children}
      </ul>
    </nav>
  );
};

export default Nav;