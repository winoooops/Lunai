import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Chat' },
    { path: '/code-review', label: 'Code Review' },
    { path: '/image-generation', label: 'Image Generation' },
    { path: '/search', label: 'Search' },
  ];

  return (
    <nav className="bg-black border-b border-claude-border p-4">
      <ul className="flex space-x-4">
        {navItems.map((item) => (
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
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
