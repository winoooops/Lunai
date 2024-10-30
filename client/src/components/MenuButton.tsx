import { DialogButton } from "../ui/Dialog";
import { TbMoon2, TbPrompt } from "react-icons/tb";
import { VscOpenPreview } from "react-icons/vsc";
import { BiPaint } from "react-icons/bi";
import { RiSearch2Line } from "react-icons/ri";
import MenuModal from "./MenuModal";

interface MenuButtonProps {
  className: string;
}


const MenuButton: React.FC<MenuButtonProps> = ({ className }) => {
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
          ${className}
        `}
        content={<MenuModal navItems={navItems} />}
      >
        <TbMoon2 />
      </DialogButton>
    </div>
  );
}

export default MenuButton;