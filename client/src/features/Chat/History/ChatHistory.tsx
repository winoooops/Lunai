import { useState } from "react";
import SearchBar from "../../../ui/SearchBar";
import { formatTimeAgo } from "../../../utils/formatTimeAgo";
import { RiChat1Line, RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import { ChatItem } from "../../../types/Chat";
import { useChatContext } from "../../../contexts/ChatContext";





const ChatHistory: React.FC<{}> = ({}) => {
  const { chats: chatEntries } = useChatContext();
  const [filtedEntries, setFilteredEntries] = useState(chatEntries);

  const onSearch = (query: string) => {
    console.log(`should continue search with ${query}`);
    const lowercaseQuery = query.toLowerCase();
    const filtered = chatEntries.filter(entry => 
      entry.title.toLowerCase().includes(lowercaseQuery)
    ) 

    setFilteredEntries(filtered);
  }

  // group chat entries by time sections
  const groupedEntries = filtedEntries.reduce((prev, entry) => {
    const timeAgo = formatTimeAgo(entry.timestamp);
    if(!prev[timeAgo]) {
      prev[timeAgo] = []
    }
    prev[timeAgo].push(entry);
    return prev;
  }, {} as Record<string, ChatItem[]>);


  const onEdit = (entry: ChatItem) => {
    console.log(`should edit: ${entry}`);
  }

  const onDelete = (entry: ChatItem) => {
    console.log(`should delete: ${entry}`);
  }
  


  return (
    <div className="bg-slate-700 rounded-lg text-slate-200 px-1 max-w-[25em]">
      <h2 className="text-xs text-bold mb-4 font-semibold">All Chats</h2>
      <SearchBar onSearch={onSearch} placeholder="Search chats..."/>
      <div>
        {
          Object.keys(groupedEntries).length === 0 ? 
          (
            <div className="text-xs text-slate-500 mt-2 mb-2 font-bold">No chats found</div>
          ) :
          (
            Object.keys(groupedEntries).map((section) => (
              <div key={section} className="mb-4">
                <h3 className="text-sm text-slate-500">{section}</h3>
                {groupedEntries[section].map((entry:ChatItem) => (
                  <div key={entry.id} className="entry cursor-pointer justify-between px-2 py-1 rounded-md text-slate-200 hover:bg-slate-800 flex items-center gap-1">
                    <RiChat1Line />
                    <span className="flex-1 truncate">{entry.title}</span>
                    <div className="flex gap-1">
                      <a className="edit-btn p-1" onClick={() => onEdit(entry)}>
                        <RiEdit2Line />
                      </a>
                      <a className="delete-btn p-1" onClick={() => onDelete(entry)}>
                        <RiDeleteBin2Line />
                      </a>
                    </div>
                  </div>
                ))}
              </div>  
            ))
          )
        } 
      </div>    
    </div>
  );
}

export default ChatHistory;
