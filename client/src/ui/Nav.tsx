import React from 'react';

interface NavProps {
  children: React.ReactNode;
  isFull?: boolean;
}


const Nav: React.FC<NavProps> = ({ children, isFull = true }) => {
  return (
    <nav className={`z-[100] ${isFull ? "w-full" : "w-4/5"} p-2 bg-slate-800`}>
      <div className="flex items-center justify-center">
        {children}
      </div>
    </nav>
  );
};

export default Nav;