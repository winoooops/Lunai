import React, { useRef } from 'react';
import { useDnDContext } from '../contexts/DnDContext';

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    shape?: 'rounded' | 'square' | 'pill';
    className?: string; 
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    // Add other props as needed (e.g., onClick, type, disabled)
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    shape = 'rounded', 
    type = "button",
    className="bg-slate-800 hover:bg-slate-600 text-slate-200",
    ...props
}) => {

    const shapeClasses = {
        rounded: 'rounded-lg',
        square: 'rounded-none',
        pill: 'rounded-full',
    };
    
    

    return (
        <button
            className={`
                px-2 py-1
                font-semibold 
                transition-colors duration-200
                focus:outline-none
                ${shapeClasses[shape]} 
                ${className}
            `}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};


export const FileUploadButton: React.FC<ButtonProps> = ({children, ...props}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { handleFileAdd } = useDnDContext();

    const handleButtonClick = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(files) {
            handleFileAdd(Array.from(files));
        }
    }

    return (
        <>
            <Button onClick={handleButtonClick} {...props}>
                {children}
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </>
    )
}


export default Button;