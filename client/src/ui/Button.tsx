import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    shape?: 'rounded' | 'square' | 'pill';
    varient?: "solid" | "transparent";
    // Add other props as needed (e.g., onClick, type, disabled)
}

const Button: React.FC<ButtonProps> = ({ children, shape = 'rounded', varient = "solid" }) => {
    const shapeClasses = {
        rounded: 'rounded-lg',
        square: 'rounded-none',
        pill: 'rounded-full',
    };

    const varientClasses = {
        "solid": "bg-cyan-600 hover:bg-cyan-700",
        "transparent": "bg-slate-800 hover:bg-slate-900"
    }

    return (
        <button
            className={`
                px-4 py-2 text-white 
                font-semibold 
                ${shapeClasses[shape]}
                ${varientClasses[varient]}    
            `}
        >
            {children}
        </button>
    );
};

export default Button;