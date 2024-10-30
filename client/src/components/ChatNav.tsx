import { RiAddLine } from "react-icons/ri";
import Nav from "../ui/Nav";
import MenuButton from "./MenuButton";
import ChatHistoryButton from "../features/Chat/History/ChatHistoryButton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useChatContext } from "../contexts/ChatContext";
import Button from "../ui/Button";
import { TiThMenu } from "react-icons/ti";
import { FaAngleDown } from "react-icons/fa";
import { DialogButton } from "../ui/Dialog";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import ChatRenamingModel from "../features/Chat/History/ChatRenamingModal";
import DeleteButton from "./DeleteButton";

const ChatNav: React.FC<{}> = ({}) => {
  const location = useLocation();
  const isChatNew = location.pathname.includes("chat/new")
  const { chatId } = useParams();
  const { getChatInfo, deleteChatById } = useChatContext();
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
      <div>
        <MenuButton className="bg-slate-800 hover:text-yellow-300 text-slate-200"/>
        <ChatHistoryButton className="bg-slate-800 hover:text-yellow-300 text-slate-200"/>
        {
          !isChatNew && 
            <Link to={`/chat/new`} className="bg-slate-800 text-slate-200 hover:text-yellow-300 px-2 no-underline inline-block">
              <RiAddLine />
            </Link>
        } 
      </div>
      {
        chatInfo && 
          <div className="grid-row-6 flex justify-self-center items-center text-slate-200 gap-2">
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

      <Button className="bg-slate-800 text-slate-200">
        <TiThMenu />
      </Button>
    </Nav>
  )
}

export default ChatNav;