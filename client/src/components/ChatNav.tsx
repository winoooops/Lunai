import { RiAddLine } from "react-icons/ri";
import Nav from "../ui/Nav";
import MenuButton from "./MenuButton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useChatContext } from "../contexts/ChatContext";
import { FaAngleDown } from "react-icons/fa";
import { DialogButton } from "../ui/Dialog";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import ChatRenamingModel from "../features/Chat/History/ChatRenamingModal";
import DeleteButton from "./DeleteButton";
import { useSidebar } from "../contexts/SidebarContext";

const ChatNav: React.FC<{}> = ({}) => {
  const location = useLocation();
  const isChatNew = location.pathname.includes("chat/new")
  const { chatId } = useParams();
  const { getChatInfo, deleteChatById } = useChatContext();
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();

  const chatInfo = getChatInfo(Number(chatId));

  const handleDelete = () => {
    // delete the current chat 
    chatId && deleteChatById(Number(chatId));
    // should jump to new page 
    navigate("/chat/new");
  }


  return (
    <Nav>
      {
        chatInfo && 
          <div className="grow flex items-center justify-center text-slate-200 gap-2">
            <HiChatBubbleLeftRight  />
            <DialogButton
              id="nav-edit-title"
              variation="dropdown"
              className="p-1 bg-transparent flex items-center gap-1 hover:bg-slate-900"
              content={
                <ul className="p-2 bg-slate-900 rounded-lg text-slate-200 font-semibold shadow-md flex flex-col">
                  <DialogButton id="chat-renaming" variation="full" className="text-left bg-slate-900 hover:bg-slate-800 hover:text-yellow-400" content={<ChatRenamingModel chat={chatInfo} />}>
                    Renaming
                  </DialogButton>
                  <DeleteButton id="chat-delete" type="full" className="text-left bg-slate-900 hover:bg-slate-800 hover:text-yellow-400" onDelete={handleDelete}>Delete</DeleteButton>
                </ul>
              }>
              <h2>{ chatInfo?.title }</h2>
              <FaAngleDown />
            </DialogButton>
          </div>
      }

      <div className={`${isCollapsed ? "w-1/3" : ""} flex justify-end items-center`}>
        <MenuButton className="bg-slate-800 hover:text-yellow-300 text-slate-200"/>
        {
          !isChatNew && 
            <Link to={`/chat/new`} className="bg-slate-800 text-slate-200 hover:text-yellow-300 px-2 no-underline inline-block">
              <RiAddLine />
            </Link>
        } 
      </div>
    </Nav>
  )
}

export default ChatNav;