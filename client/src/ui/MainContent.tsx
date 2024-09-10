import React from 'react';

interface MainContentProps {
    children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
    return (
        <main className="flex-1 flex flex-col bg-slate-800 h-full w-full">
            <div className="w-4/5 flex-1 mx-auto">
                {children}
            </div>
        </main>
    );
};

export default MainContent;