import React, { useEffect, useRef, useState } from 'react';
import Textarea from '../../../ui/Textarea';
import MessageActions from './MessageActions';
import { RiFileCloudLine, RiFileImageLine, RiSearch2Line, RiSendPlane2Line } from 'react-icons/ri';
import { useDnDContext } from '../../../contexts/DnDContext';
import { Dropdown, Ripple, initTWE } from "tw-elements";
import ModelSelector from './ModelSelector';
import useTextReply from '@/hooks/useTextReply';


const MessageInput: React.FC<{}> = () => {
  const { isDragging } = useDnDContext();
  const { handleSubmit, prompt, setPrompt } = useTextReply();
  const [isFocus, setIsFocus] = useState(false);
  const onSubmitButtonRef = useRef<HTMLButtonElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setPrompt(e.target.value); 
  }

  const onFocus = () => setIsFocus(true);
  const onBlur = () => setIsFocus(false);

  useEffect(() => {
    initTWE({ Dropdown, Ripple });
  }, []);

  const onTriggerSubmit = () => {
    // trigger the submit event and prevent the default behavior by triggering the button click
    if(onSubmitButtonRef.current) {
      onSubmitButtonRef.current.click();
    }
  }
  

  return (
    <div className="relative w-full mx-auto">
      <form onSubmit={handleSubmit}>
        <Textarea id="MesasgeInput" value={prompt} onChange={onChange} onFocus={onFocus} onBlur={onBlur} onSubmit={onTriggerSubmit}>
          <label
            htmlFor="MessageInput"
            className="flex-col place-content-center gap-y-4 pointer-events-none absolute left-3 top-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
          >
            {!isDragging && "Begin Typing or"} drag and drop to continue
            <div className="flex gap-x-2">
              <RiSearch2Line />
              <RiFileCloudLine />
              <RiFileImageLine />
            </div>
          </label>
          <MessageActions >
            <button ref={onSubmitButtonRef} type="submit" className={`rounded-full ${isFocus ? "bg-slate-200 hover:bg-slate-400 text-slate-600" : "bg-slate-900"}`} >
              <RiSendPlane2Line />
            </button>
          </MessageActions>
          <ModelSelector /> 
        </Textarea>
      </form>  
    </div>
  );
}


export default MessageInput;
