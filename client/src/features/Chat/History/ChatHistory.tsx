import { useEffect, useState } from "react";
import SearchBar from "../../../ui/SearchBar";
import { formatTimeAgo } from "../../../utils/formatTimeAgo";
import { ChatItem } from "../../../types/Chat";
import { useChatContext } from "../../../contexts/ChatContext";
import ChatLink from "./ChatLink";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../../../contexts/DialogContext";


const ChatHistory: React.FC<{}> = ({}) => {
  const { chats: chatEntries } = useChatContext();
  const { closeDialog } = useDialog();
  const [filtedEntries, setFilteredEntries] = useState(chatEntries);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredEntries(chatEntries);
  }, [chatEntries]);


  const onSearch = (query: string) => {
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

  
  const handleSelect = (id: number) => {
    navigate(`/chat/${id}`);
    closeDialog();
  }

  return (
    <div className="bg-slate-900 rounded-lg text-slate-200 p-4 mt-2 w-[25em]">
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
                  <ChatLink chatItem={entry} onSelect={handleSelect}/>                  
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
