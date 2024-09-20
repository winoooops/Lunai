import { createContext, useContext, useState } from "react";

interface DnDContextType {
    files: File[];
    isDragging: boolean;
    isDropped: boolean;
    shouldShowFiles: boolean;
    fileDialogOpened: boolean;
    fileCount: number;
    handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
    handleDragEnter: (e: React.DragEvent<HTMLElement>) => void;
    handleDragLeave: () => void;
    handleDropped: (e: React.DragEvent<HTMLElement>) => void; // Updated to accept a callback
    handleFileRemove: (file: File) => void;
    openFile: () => void;
    closeFile: () => void;
}

const DnDContext = createContext<DnDContextType | undefined>(undefined);

export const DnDContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isDropped, setIsDropped] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [fileDialogOpened, setFileDialogOpened] = useState(false);

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
        setFiles(prev => [...prev, ...droppedFiles])
    }

    const handleDragLeave = () => {
        setIsDragging(false);
    }

    const handleFileRemove = (file: File) => {
        setFiles(files => files.filter(f => f != file))
    }

    const shouldShowFiles = files.length > 0;
    const fileCount = files.length;

    const openFile = () => setFileDialogOpened(true);
    const closeFile = () => setFileDialogOpened(false);


    return (
        <DnDContext.Provider value={{ 
            shouldShowFiles,
            files,
            isDragging, 
            isDropped, 
            fileDialogOpened,
            fileCount,
            handleDragOver,
            handleDragEnter, 
            handleDropped,
            handleDragLeave,
            handleFileRemove,
            openFile,
            closeFile,
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
