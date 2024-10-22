import React from "react";
import { IoChatboxOutline } from "react-icons/io5";
import Button from "../../../ui/Button";
import { RiDeleteBin5Line } from "react-icons/ri";

interface CardProps {
  title: string;
  timeAgo: string;
}


const ChatCard: React.FC<CardProps> = ({title, timeAgo}) => {
  return (
    <div className="group chat-card cursor-pointer p-4 bg-slate-700 text-slate-200 border-2 border-transparent hover:border-yellow-500 hover:shadow-lg hover:scale-105 rounded-xl inline-block max-w-xs flex-col gap-2 transition-transform duration-300">
      <div className="card-header flex justify-between items-center h-[30%] w-full">
        <IoChatboxOutline />
        <Button shape="pill" className="card-delete slate-800 px-0">
          <RiDeleteBin5Line />
        </Button>
      </div>
      <div className="flex-col gap-1 w-[80%]">
        <p className="truncate font-semibold mt-2 mb-2 text-lg">{title}</p>
        <span className="bg-slate-800 px-2 py-1 text-xs font-semibold rounded-lg group-hover:bg-yellow-500 group-hover:text-slate-900 transition-transform duration-300">{timeAgo}</span>
      </div>
       
    </div>
  );
}

export default ChatCard;