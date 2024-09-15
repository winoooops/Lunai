import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

interface NavProps {
  children: React.ReactNode;
}


const Nav: React.FC<NavProps> = ({ children }) => {
  // const location = useLocation();

  const navItems = [
    { path: '/chat', label: 'Chat' },
    { path: '/code-review', label: 'Code Review' },
    { path: '/image-generation', label: 'Image Generation' },
    { path: '/search', label: 'Search' },
  ];

  console.log(navItems);

  return (
    <nav className="z-[100] w-1/8 pl-4 bg-slate-800 absolute top-0 left-0">
      <ul className="flex-col place-content-center">
        {children}
        {/* {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`py-2 px-4 rounded transition-colors ${
                location.pathname === item.path
                  ? 'bg-claude-blue text-white'
                  : 'text-claude-text hover:bg-claude-gray'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))} */}
      </ul>
    </nav>
  );
};

export default Nav;