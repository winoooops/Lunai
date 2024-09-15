import React from 'react';

interface ColorScheme {
    bg: string;
    text: string;
    hover: string;
}

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "rest";
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
                transition-colors duration-200
                focus:outline-none
                ${shapeClasses[shape]} 
                ${colorScheme.bg}
                ${colorScheme.hover}
                ${colorScheme.text}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;