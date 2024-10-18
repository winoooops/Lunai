import { useState } from "react";
import SearchBar from "../../../ui/SearchBar";
import { formatTimeAgo } from "../../../utils/formatTimeAgo";
import { RiChat1Line, RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";

type ChatHistoryItem = {
  title: string;
  id: number;
  timestamp: Date;
}

const items: ChatHistoryItem[] = [
    {title: "I need help with my tax", id: 1, timestamp: new Date(Date.now() - 1000 * 60 * 10)},
    {title: "can you sort out this json file for me? I am using it in my react application to define tailwind config", id: 2, timestamp: new Date(Date.now() - 1000 * 60 * 60)},
    {title: "What is the best way to learn React?", id: 3, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
];


const ChatHistory: React.FC<{}> = ({}) => {
  const [chatEntries, setChatEntries] = useState(items);
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
  }, {} as Record<string, ChatHistoryItem[]>);


  const onEdit = (entry: ChatHistoryItem) => {
    console.log(`should edit: ${entry}`);
  }

  const onDelete = (entry: ChatHistoryItem) => {
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
                {groupedEntries[section].map((entry) => (
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
