import { DialogButton } from "../ui/Dialog";
import { TbMoon2, TbPrompt } from "react-icons/tb";
import { VscOpenPreview } from "react-icons/vsc";
import { BiPaint } from "react-icons/bi";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

interface MenuButtonProps {
  colorScheme: {
    bg: string;
    hover: string;
    text: string;
  }
}


const MenuButton: React.FC<MenuButtonProps> = ({ colorScheme }) => {
  const navItems = [
    { path: '/chat', label: 'Chat', icon: <TbPrompt /> },
    { path: '/code-review', label: 'Code Review', icon: <VscOpenPreview /> },
    { path: '/image-generation', label: 'Image Generation', icon: <BiPaint /> },
    { path: '/search', label: 'Search', icon: <RiSearch2Line /> },
  ];

  return (
    <div className="relative inline-block cursor-pointer py-2">
      <DialogButton id="menu-dialog" 
        variation="dropdown"
        className={`
          p-2 text-slate-200
          ${colorScheme.bg}
          ${colorScheme.hover}
          ${colorScheme.text}
        `}
        content={
          <ul className="flex flex-col"> {/* Use flex-col for vertical alignment */}
            {navItems.map(item => (
              <li key={item.path} className="flex items-center p-1"> {/* Flex for horizontal alignment */}
                <Link to={item.path} className="flex place-items-center text-slate-200 no-underline hover:text-yellow-300">
                  {item.icon} <span className="ml-2">{item.label}</span> {/* Add margin for spacing */}
                </Link>
              </li>
            ))}
          </ul>
        }
      >
        <TbMoon2 />
      </DialogButton>
    </div>
  );
}

export default MenuButton;