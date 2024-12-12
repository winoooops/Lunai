import React, { useEffect } from 'react';
import MessageInput from '../../features/Chat/Messages/MessageInput';
import { useDnDContext } from '../../contexts/DnDContext';
import MessageFiles from '../../features/Chat/Messages/MessageFiles';
import { useParams, useLocation } from 'react-router-dom';
import { useChatContext } from '@/contexts/ChatContext';
import MessageList from '@/features/Chat/Messages/MessageList';

const ChatDetailsPage: React.FC = () => {
  const { shouldShowFiles } = useDnDContext();
  const { chatId } = useParams<{chatId: string}>();
  const location = useLocation();
  const { focusChat } = useChatContext();

  useEffect(() => {
    if(chatId && chatId !== "") {
      focusChat(chatId);
    }
  }, [chatId, location.pathname]);

  return (
    <div className='h-full'>
      <div className="flex flex-col h-full relative">
        <MessageList chatId={chatId || ""} /> 
        <div className="w-full px-4 sticky bottom-0 bg-slate-800 bg-opacity-50">
          {
            shouldShowFiles && <MessageFiles />
          }
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatDetailsPage;