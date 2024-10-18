import React, { useState } from 'react';
import { MessageBubble } from '../features/Chat/Messages/MessageBubble';
import MessageInput from '../features/Chat/Messages/MessageInput';
import { useDnDContext } from '../contexts/DnDContext';
import MessageFiles from '../features/Chat/Messages/MessageFiles';
import MessageLanding from '../features/Chat/Messages/MessagesLanding';

interface Message {
  isUser: boolean;
  content: string;
}

const initialMessages: Message[] = [
  {
    isUser: false,
    content: "Hello, how can I help you today?"
  },
  {
    isUser: true,
    content: "I need help with my taxes."
  }
]

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { shouldShowFiles } = useDnDContext();

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { isUser: true, content: message }]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6">
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
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
