import React from 'react';

interface DialogProps {
    children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ children }) => {
    return (
        <div className="absolute z-10 bg-slate-700 shadow-lg rounded-lg p-4 mt-2 min-w-[200px]"> {/* Set a minimum width */}
            {children}
        </div>
    );
};

export default Dialog;