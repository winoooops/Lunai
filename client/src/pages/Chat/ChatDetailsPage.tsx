import React, { useEffect } from 'react';
import MessageInput from '../../features/Chat/Messages/MessageInput';
import { useDnDContext } from '../../contexts/DnDContext';
import MessageFiles from '../../features/Chat/Messages/MessageFiles';
import { useParams } from 'react-router-dom';
import { useChatContext } from '@/contexts/ChatContext';
import MessageList from '@/features/Chat/Messages/MessageList';



const ChatDetailsPage: React.FC = () => {
  const { shouldShowFiles } = useDnDContext();
  const { chatId } = useParams<{chatId: string}>();
  const { focusChat } = useChatContext();

  useEffect(() => {
    if(chatId && chatId !== "") {
      focusChat(chatId);
    }
  }, [chatId]);

  return (
    <div className='h-full flex'>
      <div className="flex flex-col h-full flex-1">
        <div className="flex-1 w-full overflow-y-auto px-4 py-6">
          <MessageList chatId={chatId || ""} /> 
        </div>
        <div className="w-full px-4 py-4">
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