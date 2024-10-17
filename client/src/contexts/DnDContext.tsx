import { createContext, useContext, useState } from "react";

interface DnDContextType {
    files: File[];
    isDragging: boolean;
    isDropped: boolean;
    shouldShowFiles: boolean;
    fileCount: number;
    handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
    handleDragEnter: (e: React.DragEvent<HTMLElement>) => void;
    handleDragLeave: () => void;
    handleDropped: (e: React.DragEvent<HTMLElement>) => void; // Updated to accept a callback
    handleFileAdd: (files: File[]) => void;
    handleFileRemove: (file: File) => void;
}

const DnDContext = createContext<DnDContextType | undefined>(undefined);

export const DnDContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isDropped, setIsDropped] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    }


    const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        setIsDropped(false);
        setIsDragging(true);
    }

    const handleDropped = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        setIsDragging(false);
        setIsDropped(true);

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFileAdd(droppedFiles);
    }

    const handleDragLeave = () => {
        setIsDragging(false);
    }

    const handleFileRemove = (file: File) => {
        setFiles(files => files.filter(f => f != file))
    }

    const handleFileAdd = (files: File[]) => {
        setFiles(prev => [...prev, ...files]);
    }

    const shouldShowFiles = files.length > 0;
    const fileCount = files.length;
    

    return (
        <DnDContext.Provider value={{ 
            shouldShowFiles,
            files,
            isDragging, 
            isDropped, 
            fileCount,
            handleDragOver,
            handleDragEnter, 
            handleDropped,
            handleDragLeave,
            handleFileAdd,
            handleFileRemove,
        }}>
            {children}
        </DnDContext.Provider>
    );
}

export const useDnDContext = () => {
    const context = useContext(DnDContext);

    if (context === undefined) {
        throw new Error("useDnDContext must be used within a DnDContextProvider");
    }

    return context;
}
