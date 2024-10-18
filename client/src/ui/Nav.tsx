import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

interface NavProps {
  children: React.ReactNode;
}


const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <nav className="z-[100] w-1/8 pl-4 bg-slate-800 absolute top-0 left-0">
      <ul className="flex-col place-content-center">
        {children}
      </ul>
    </nav>
  );
};

export default Nav;