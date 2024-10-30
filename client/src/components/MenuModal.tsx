import { Link } from "react-router-dom";

export type NavItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export interface MenuModalProps {
  navItems: NavItem[]; 
}

const MenuModal: React.FC<MenuModalProps> = ({ navItems }) => {
  return (
    <div className="p-4 mt-2 bg-slate-900 rounded-xl">
      <ul className="flex flex-col"> {/* Use flex-col for vertical alignment */}
        {navItems.map(item => (
          <li key={item.path} className="flex items-center p-1"> {/* Flex for horizontal alignment */}
            <Link to={item.path} className="flex place-items-center text-slate-200 no-underline hover:text-yellow-300">
              {item.icon} <span className="ml-2">{item.label}</span> {/* Add margin for spacing */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuModal;