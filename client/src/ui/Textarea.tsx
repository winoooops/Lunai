import { useEffect } from "react";
import { initTWE,Input, } from "tw-elements";

interface TextareaProps {
    children: React.ReactNode,
    id: string;
    placeholderText: string;
}


const Textarea: React.FC<TextareaProps> = ({ children, id, placeholderText }) => {
   useEffect(() => {
    initTWE({ Input })
   })

   return (
    <div className="relative mb-3 flex items-center" data-twe-input-wrapper-init>
        <textarea
            className="peer block min-h-[auto] w-full rounded border-0 bg-slate-800 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            id={id}   
            rows={3}
            placeholder=" "
        >
        </textarea>
        <label
            htmlFor={id}
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
        >
            {placeholderText}
        </label>
        {children}
    </div>
   ) 
}

export default Textarea;