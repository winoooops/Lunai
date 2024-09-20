import React, { useEffect, useState } from 'react';
import Textarea from '../../../ui/Textarea';
import MessageActions from './MessageActions';
import { RiFileCloudLine, RiFileImageLine, RiSearch2Line } from 'react-icons/ri';
import { useDnDContext } from '../../../contexts/DnDContext';
import { Dropdown, Ripple, initTWE } from "tw-elements";
import { GrFormDown } from "react-icons/gr";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => setIsFocus(true);
  const onBlur = () => setIsFocus(false);

  const { isDragging } = useDnDContext();

  useEffect(() => {
    initTWE({ Dropdown, Ripple });
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    console.log("submit triggered..");
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleFileAdd = (files: File[]) => {
    console.log("files added", files);
  }



  return (
    <div className="relative w-[80%] mx-auto">
      <form onSubmit={handleSubmit}>
        <Textarea id="MesasgeInput" onFocus={onFocus} onBlur={onBlur}>
          <label
            htmlFor="MessageInput"
            className="flex-col place-content-center gap-y-4 pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
          >
            {!isDragging && "Begin Typing or"} drag and drop to continue
            <div className="flex gap-x-2">
              <RiSearch2Line />
              <RiFileCloudLine />
              <RiFileImageLine />
            </div>
          </label>
          <MessageActions isFocus={isFocus} />
          <div className="absolute bottom-1 left-2">
            <div className="relative" data-twe-dropdown-position="dropup">
              <button
                className="flex items-center rounded bg-slate-900 px-2 py-1 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-slate-600 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                type="button"
                id="dropdownMenuButton1u"
                data-twe-dropdown-toggle-ref
                aria-expanded="false"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                >
              Model
              <GrFormDown />
              </button>
            </div>
          </div>
        </Textarea>
         
      </form>  
    </div>
  );
}


export default MessageInput;
