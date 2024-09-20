import React, { useState } from 'react';
import { MessageBubble } from './Messages/MessageBubble';
import MessageInput from './Messages/MessageInput';
import { useDnDContext } from '../../contexts/DnDContext';
import MessageFiles from './Messages/MessageFiles';
import Dialog from '../../ui/Dialog';

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
  const { shouldShowFiles, fileDialogOpened, closeFile } = useDnDContext();

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { isUser: true, content: message }]);
    // Here you would typically send the message to your backend
    // and then add the AI's response to the messages
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            isUser={message.isUser}
            content={message.content}
          />
        ))}
      </div>
      <div className="w-full px-4 py-4">
        {
          shouldShowFiles && <MessageFiles />
        }
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      { fileDialogOpened && (
        <Dialog onClose={closeFile} position="center">
          should display file content here
        </Dialog>
      )
      }
    </div>
  );
};

export default Chat;
