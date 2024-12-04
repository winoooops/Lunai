import React, { useEffect } from 'react';
import { MessageBubble } from '../../features/Chat/Messages/MessageBubble';
import MessageInput from '../../features/Chat/Messages/MessageInput';
import { useDnDContext } from '../../contexts/DnDContext';
import MessageFiles from '../../features/Chat/Messages/MessageFiles';
import MessageLanding from '../../features/Chat/Messages/MessagesLanding';
import { useParams } from 'react-router-dom';
import { useChatContext } from '@/contexts/ChatContext';



const ChatDetailsPage: React.FC = () => {
  const { shouldShowFiles } = useDnDContext();
  const { chatId } = useParams<{chatId: string}>();
  const { focusChat, localMessages: messages } = useChatContext();

  useEffect(() => {
    if(chatId && chatId !== "") {
      focusChat(chatId);
    }
  }, [chatId]);

  return (
    <div className='h-full flex'>
      <div className="flex flex-col h-full flex-1">
        <div className="flex-1 w-full overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <MessageLanding />
          ) : (
            messages.map((message, index) => (
              <MessageBubble
                key={index}
                isUser={message.role === "user"}
                content={message.content[0]}
              />
            ))
          )}
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
