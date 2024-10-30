import { useNavigate } from "react-router-dom";
import { ChatItem } from "../../../types/Chat";
import { RiArrowGoBackLine, RiChat1Line, RiEdit2Line } from "react-icons/ri";
import { LuSave } from "react-icons/lu";
import useChatRename from "../../../hooks/useChatRename";

interface ChatLinkProps {
  chatItem: ChatItem;
  onSelect: (id: number) => void;
}

const ChatLink: React.FC<ChatLinkProps> = ({ chatItem, onSelect }) => {
  const { editingChat, inputRef, handleInputCancel, handleInputChange, handleInputFocus, onEdit, handleSave } = useChatRename();

  return (
    <div onClick={() => onSelect(chatItem.id)} key={chatItem.id} className="entry cursor-pointer justify-between px-2 py-1 rounded-md text-slate-200 hover:text-yellow-300 hover:bg-slate-800 flex items-center gap-1 hover:scale-105 transition-transform duration-200">
      <RiChat1Line />
      {
        editingChat.id === chatItem.id ? 
        <input 
          ref={inputRef} 
          className="rounded flex-1 px-2 py-1 border bg-slate-900 focus:outline-none focus:border-yellow-400 focus:text-slate-200" value={editingChat.title} 
          onChange={handleInputChange}  
          onFocus={handleInputFocus}
        />
        : <span className="flex-1 font-bold px-2 py-1 truncate">{chatItem.title}</span>  
      }
      {
        editingChat.id == chatItem.id ?
        <>                      
          <div className="text-slate-200 hover:text-yellow-500" onClick={handleInputCancel}>
            <RiArrowGoBackLine />                  
          </div>
          <div className="text-slate-200 hover:text-yellow-500">
            <LuSave onClick={handleSave}/>
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