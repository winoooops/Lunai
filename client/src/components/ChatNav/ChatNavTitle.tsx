import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { DialogButton } from "../../ui/Dialog";
import DeleteButton from "../DeleteButton";
import { FaAngleDown } from "react-icons/fa";
import ChatRenamingModel from "../../features/Chat/History/ChatRenamingModal";
import { useChatContext } from "../../contexts/ChatContext";
import { useNavigate } from "react-router-dom";

const ChatNavTitle: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { activeChat, deleteChatById } = useChatContext();
  const chatId = activeChat?.id;

  const handleDelete = () => {
    // delete the current chat 
    chatId && deleteChatById(chatId);
    // should jump to new page 
    navigate("/chat/new");
  }

  if(!activeChat) return (
    <div className="w-full"></div>
  );

  return (
    <div className="w-2/3 grow flex items-center justify-center text-slate-200 gap-2">
      <HiChatBubbleLeftRight  />
      <DialogButton
        id="nav-edit-title"
        variation="dropdown"
        className="p-1 bg-transparent flex items-center gap-1 hover:bg-slate-900"
        content={
          <ul className="p-2 bg-slate-900 rounded-lg text-slate-200 font-semibold shadow-md flex flex-col">
            <DialogButton id="chat-renaming" variation="full" className="text-left bg-slate-900 hover:bg-slate-800 hover:text-yellow-400" content={<ChatRenamingModel chat={activeChat} />}>
              Renaming
            </DialogButton>
            <DeleteButton id="chat-delete" type="full" className="text-left bg-slate-900 hover:bg-slate-800 hover:text-yellow-400" onDelete={handleDelete}>Delete</DeleteButton>
          </ul>
        }>
        <h2 className="truncate">{ activeChat?.title }</h2>
        <FaAngleDown />
      </DialogButton>
    </div>
  );
}

export default ChatNavTitle;