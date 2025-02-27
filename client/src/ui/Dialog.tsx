import React, { ReactNode, useEffect, useRef } from 'react';
import { useDialog } from '../contexts/DialogContext';

interface DialogProps {
  children: React.ReactNode;
  onClose?: () => void;
}

interface DialogButtonType {
    id: string;
    content: ReactNode;
    children: ReactNode;
    className?: string;
    variation?: DialogVariation;
}

export type DialogVariation = "full" | "dropdown" | "dropup"; 
export type DialogPosition = {
    left: number;
    top: number;
    bottom?: number;
}

export const Dialog: React.FC<DialogProps> = ({ children }) => {
    const { closeDialog, variation, position, dialogRef } = useDialog();

    const handleClickOutside = (e: MouseEvent) => {
        if(dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
           closeDialog();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    
    if(variation == "full") {
        return (
            <div ref={dialogRef} 
                className="absolute z-10 bg-slate-900 shadow-lg rounded-lg mt-2 min-w-[200px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                {children}
            </div>
        ) 
    } 

    return (
        <div ref={dialogRef} 
            className="absolute z-10 shadow-lg rounded-lg min-w-[200px]"
            style={{ top: position.top, left: position.left }}
        >
            {children}    
        </div>
    );
};

export const DialogButton: React.FC<DialogButtonType> = ({ id, content, children, className, variation = "full" }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { openDialog } = useDialog(); 

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(buttonRef.current) {
            const rect: DOMRect = buttonRef.current.getBoundingClientRect();
            // TODO: find a way to calculate the dropup menu's position
            const dialogPosition: DialogPosition = {
                top: variation === "dropdown" ? rect.bottom + window.scrollY : rect.top + window.scrollY,
                left: rect.left + window.scrollX
            }
            openDialog(id, content, variation, dialogPosition);
        }
    }
    
    return (
        <button className={`focus:outline-none ${className}`} type="button" onClick={handleClick} ref={buttonRef}>
           {children} 
        </button>
    )
}