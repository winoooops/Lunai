import { Link, useLocation } from "react-router-dom";
import { RiChatNewLine } from "react-icons/ri";
import Button from "../../ui/Button";
import { AiOutlineControl } from "react-icons/ai";
import { useSidebar } from "../../contexts/SidebarContext";
import MessageSidebarWrapper from "../../features/Chat/Messages/MessageSidebarWrapper";
import { ChatConfig } from "@/features/Chat/History/ChatConfig";

const ChatNavButtonGroup: React.FC<{isWidthFixed: boolean}> = ({ isWidthFixed }) => {
  const location = useLocation();
  const isChatNew = location.pathname.includes("chat/new")
  const { rightSidebar, openSidebar, closeSidebar } = useSidebar();
  const handleClick = () => {
    if(rightSidebar && rightSidebar.isOpened) {
      closeSidebar(rightSidebar.id);
    } else {
      openSidebar("right", "right", <MessageSidebarWrapper><ChatConfig /></MessageSidebarWrapper>)
    }
  }

  return (
    <div className={`${isWidthFixed ? "w-1/3" : ""} flex justify-end items-center`}>
      {
        !isChatNew && <>
          <Button className="bg-slate-800 hover:text-yellow-300 text-slate-200">
            <AiOutlineControl onClick={handleClick}/>
          </Button>

          <Link to={`/chat/new`} className="bg-slate-800 text-yellow-200 hover:text-yellow-500 px-2 no-underline inline-block">
            <RiChatNewLine  />
          </Link>
        </>
        }
    </div>   
    );
  }

  export default ChatNavButtonGroup;