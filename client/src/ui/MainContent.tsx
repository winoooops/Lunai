import React from 'react';

interface MainContentProps {
    children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
    return (
        <main className="flex-1 w-full flex flex-col mx-auto h-full">
            <div className="w-full flex-1">
                {children}
            </div>
        </main>
    );
};

export default MainContent;