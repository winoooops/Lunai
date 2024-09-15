import { useEffect } from "react";
import { initTWE,Input, } from "tw-elements";

interface TextareaProps {
    children: React.ReactNode,
    id: string;
    onFocus: () => void;
    onBlur: () => void;
}


const Textarea: React.FC<TextareaProps> = ({ children, id, onFocus, onBlur }) => {
   useEffect(() => {
    initTWE({ Input })
   })

   return (
    <div className="relative mb-3 flex items-center text-slate-400" data-twe-input-wrapper-init>
        <textarea
            className="peer pl-4 pt-6 pr-20 block min-h-[auto] w-full bg-slate-900 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            id={id}   
            rows={4}
            placeholder=" "
            onFocus={onFocus}
            onBlur={onBlur}
        >
        </textarea>
        {children}
    </div>
   ) 
}

export default Textarea;