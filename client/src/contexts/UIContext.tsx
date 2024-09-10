import { createContext, useContext, useState } from "react";

interface UIContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    openSidebar: () => void;
    closeSidebar: () => void;
}


const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);
    
    return (
        <UIContext.Provider value={{ isSidebarOpen, toggleSidebar, openSidebar, closeSidebar }}>
            {children}
        </UIContext.Provider>
    )
};

export const useUIContext = () => {
    const context = useContext(UIContext);

    if(context === undefined) {
        throw new Error("useUIContext must be used within a UIContextProvider");
    }

    return context;
}