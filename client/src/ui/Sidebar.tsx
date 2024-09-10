import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Session {
  id: string;
  title: string;
}

interface SidebarProps {
  sessions: Session[];
  currentOperation: string;
}

const Sidebar: React.FC<SidebarProps> = ({ sessions, currentOperation }) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-claude-gray border-r border-claude-border p-4 flex flex-col">
      <ul className="space-y-2 flex-grow">
        {sessions.map((session) => (
          <li key={session.id}>
            <Link
              to={`/${currentOperation.toLowerCase()}/${session.id}`}
              className={`block py-2 px-4 rounded transition-colors ${
                location.pathname.includes(session.id)
                  ? 'bg-claude-blue text-white'
                  : 'hover:bg-white'
              }`}
            >
              {session.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4 border-t border-claude-border">
        <button className="w-full py-2 px-4 bg-claude-blue text-white hover:bg-blue-600 rounded transition-colors">
          New Session
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;