import { useEffect, useState } from "react";
import SearchBar from "../../../ui/SearchBar";
import { formatTimeAgo } from "../../../utils/formatTimeAgo";
import { ChatItem } from "../../../types/Chat";
import { useChatContext } from "../../../contexts/ChatContext";
import ChatLink from "./ChatLink";
import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import { RiSidebarUnfoldLine } from "react-icons/ri";
import { useSidebar } from "../../../contexts/SidebarContext";


const ChatHistory: React.FC<{}> = ({}) => {
  const { chats: chatEntries } = useChatContext();
  const { toggleCollapse } = useSidebar();
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
  }

  return (
    <div className="bg-slate-900 rounded-lg text-slate-200 p-4 mt-2 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs text-bold font-semibold">All Chats</h2>
        <Button className="bg-transparent hover:bg-slate-800" onClick={toggleCollapse}>
          <RiSidebarUnfoldLine /> 
        </Button>
      </div>
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
                  <ChatLink key={entry.id} chatItem={entry} onSelect={handleSelect}/>                  
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
