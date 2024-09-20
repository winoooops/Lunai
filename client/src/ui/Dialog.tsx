import React, { useEffect, useRef } from 'react';

interface DialogProps {
    children: React.ReactNode;
    position?: "center" | "top" | "bottom";
    onClose?: () => void;
}

const Dialog: React.FC<DialogProps> = ({ children, onClose, position }) => {
    const dialogRef = useRef<HTMLDivElement>(null); 

    const handleClickOutside = (e: MouseEvent) => {
        if(onClose == undefined) return;

        if(dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
           onClose(); 
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div ref={dialogRef} className={`
            absolute z-10 bg-slate-700 shadow-lg rounded-lg p-4 mt-2 min-w-[200px]
            ${position == "center" ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" : ""}
        `}>
            {children}
        </div>
    );
};

export default Dialog;