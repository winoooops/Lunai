import { RiArrowGoBackLine, RiChat1Line, RiEdit2Line } from "react-icons/ri";
import { LuSave } from "react-icons/lu";
import useChatRename from "../../../hooks/useChatRename";
import { Chat } from "@LunaiTypes/chat";
import { useSidebar } from "@/contexts/SidebarContext";

interface ChatLinkProps {
  chatItem: Chat;
  onSelect: (id: string) => void;
}

const ChatLink: React.FC<ChatLinkProps> = ({ chatItem, onSelect }) => {
  const { editingChat, inputRef, handleInputCancel, handleInputChange, handleInputFocus, onEdit, handleSave } = useChatRename(true);
  const { enableAutoHide, disableAutoHide } = useSidebar();

  const handleFocus = () => {
    handleInputFocus();
    disableAutoHide();
  }

  const onSave = () => {
    handleSave();
    enableAutoHide();
  }

  const onCancel = () => {
    handleInputCancel();
    enableAutoHide();
  }


  return (
    <div onClick={() => onSelect(chatItem.id)} key={chatItem.id} className="entry cursor-pointer justify-between px-2 py-1 rounded-md text-slate-200 hover:text-yellow-300 hover:bg-slate-800 flex items-center gap-1 hover:scale-105 transition-transform duration-200">
      <RiChat1Line />
      {
        editingChat.id === chatItem.id ? 
        <input 
          ref={inputRef} 
          className="max-w-[82%] rounded px-2 py-1 border bg-slate-900 focus:outline-none focus:border-yellow-400 focus:text-slate-200" value={editingChat.title} 
          onChange={handleInputChange}  
          onFocus={handleFocus}
        />
        : <span className="flex-1 font-bold px-2 py-1 truncate">{chatItem.title}</span>  
      }
      {
        editingChat.id == chatItem.id ?
        <>                      
          <div className="text-slate-200 hover:text-yellow-500" onClick={onCancel}>
            <RiArrowGoBackLine />                  
          </div>
          <div className="text-slate-200 hover:text-yellow-500">
            <LuSave onClick={onSave}/>
          </div>
        </> : 
        <div className="flex gap-1">
          <div className="edit-btn p-1" onClick={() => onEdit(chatItem)}>
            <RiEdit2Line />
          </div>
        </div>
      }
      
    </div>
  );
}

export default ChatLink;