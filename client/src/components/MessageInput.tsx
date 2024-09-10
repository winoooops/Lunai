import React, { useState } from 'react';
import Textarea from '../ui/Textarea';
import MessageActions from './MessageActions';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <Textarea id="MesasgeInput" placeholderText="Input text here...">
            <MessageActions />
        </Textarea>
      </form>  
    </div>
  );
}


export default MessageInput;
