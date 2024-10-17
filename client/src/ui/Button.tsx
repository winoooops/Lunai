import React, { useRef } from 'react';
import { useDnDContext } from '../contexts/DnDContext';

interface ColorScheme {
    bg: string;
    text: string;
    hover: string;
}

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    shape?: 'rounded' | 'square' | 'pill';
    colorScheme?: ColorScheme; 
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    // Add other props as needed (e.g., onClick, type, disabled)
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    shape = 'rounded', 
    type = "button",
    colorScheme = {
        bg: "bg-slate-800",
        hover: "hover:bg-slate-600",
        text: "text-slate-200"
    },
    ...props
}) => {

    const shapeClasses = {
        rounded: 'rounded-lg',
        square: 'rounded-none',
        pill: 'rounded-full',
    };

    const paddings = {
        "pill": "px-3 py-2", 
        "square": "px4 py-2",
        "rounded": "px4 py-2"
    }
    

    return (
        <button
            className={`
                ${paddings[shape]}
                font-semibold 
                transition-colors duration-j200
                focus:outline-none
                ${shapeClasses[shape]} 
                ${colorScheme.bg}
                ${colorScheme.hover}
                ${colorScheme.text}
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