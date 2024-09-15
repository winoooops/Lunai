import React, { useState } from 'react';
import Textarea from '../ui/Textarea';
import MessageActions from './MessageActions';
import { RiFileCloudLine, RiFileImageLine, RiSearch2Line } from 'react-icons/ri';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => setIsFocus(true);
  const onBlur = () => setIsFocus(false);


  const handleSubmit = (e: React.FormEvent) => {
    console.log("submit triggered..");
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };



  return (
    <div className="relative w-[80%] mx-auto">
      <form onSubmit={handleSubmit}>
        <Textarea id="MesasgeInput" onFocus={onFocus} onBlur={onBlur}>
          <label
            htmlFor="MessageInput"
            className="flex-col place-content-center gap-y-4 pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
          >
            Begin typing or drag and drop to continue
            <div className="flex gap-x-2">
              <RiSearch2Line />
              <RiFileCloudLine />
              <RiFileImageLine />
            </div>
          </label>
          <MessageActions isFocus={isFocus} />
        </Textarea>
      </form>  
    </div>
  );
}


export default MessageInput;
