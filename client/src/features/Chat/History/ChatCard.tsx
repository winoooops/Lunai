import React from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import DeleteButton from "../../../components/DeleteButton";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../../utils/formatTimeAgo";
import { ChatItem } from "../../../types/Chat";
import { useChatContext } from "../../../contexts/ChatContext";

interface CardProps {
  chat: ChatItem;
}


const ChatCard: React.FC<CardProps> = ({chat}) => {
  const { deleteChatById } = useChatContext();

  return (
    <div className="group chat-card cursor-pointer p-4 bg-slate-700 text-slate-200 border-2 border-transparent hover:border-yellow-500 hover:shadow-lg hover:scale-105 rounded-xl inline-block max-w-xs flex-col gap-2 transition-transform duration-300">
      <Link to={`/chat/${chat.id}`} className="no-underline text-slate-200 hover:text-slate-200">
        <div className="card-header flex justify-between items-center h-[30%] w-full">
          <IoChatboxOutline />
          <DeleteButton id="card-delete" className="card-delete slate-800 px-0" onDelete={() => deleteChatById(chat.id)}>
            <RiDeleteBin5Line />
          </DeleteButton>
        </div>
        <div  className="card-body flex-col gap-1 w-[80%]">
          <p className="truncate font-semibold mt-2 mb-2 text-lg">{chat.title}</p>
          <span className="bg-slate-800 px-2 py-1 text-xs font-semibold rounded-lg group-hover:bg-yellow-500 group-hover:text-slate-900 transition-transform duration-300">{formatTimeAgo(chat.updated_at)}</span>
        </div>
      </Link>
    </div>
  );
}

export default ChatCard;