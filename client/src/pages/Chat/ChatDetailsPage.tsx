import React, { useEffect } from 'react';
import { MessageBubble } from '../../features/Chat/Messages/MessageBubble';
import MessageInput from '../../features/Chat/Messages/MessageInput';
import { useDnDContext } from '../../contexts/DnDContext';
import MessageFiles from '../../features/Chat/Messages/MessageFiles';
import MessageLanding from '../../features/Chat/Messages/MessagesLanding';
import { useMessageContext } from '../../contexts/MessageContext';



const ChatDetailsPage: React.FC = () => {
  const { shouldShowFiles } = useDnDContext();
  const { messages, onSend, onClear } = useMessageContext();
  
  useEffect(() => {
    onSend("I need help create my personal AI assistant.")

    return () => onClear();
  }, []);

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
                isUser={message.isUser}
                content={message.content}
              />
            ))
          )}
        </div>
        <div className="w-full px-4 py-4">
          {
            shouldShowFiles && <MessageFiles />
          }
          <MessageInput onSendMessage={onSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatDetailsPage;
