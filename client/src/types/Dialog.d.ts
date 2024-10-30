export interface DialogProps {
    children: React.ReactNode;
    onClose?: () => void;
}

export interface DialogContextType {
    openDialog: (id: string, content: ReactNode, dialogVariation: DialogVariation, dialogPosition?: DialogPosition) => void;
    closeDialog: () => void;
    isOpen: boolean;
    content: ReactNode | null;
    activeDialogId: string | null;
    variation: DialogVariation;
    position: DialogPosition;
    dialogRef: React.RefObject<HTMLDivElement>;
}

export interface DialogButtonType {
    id: string;
    content: ReactNode;
    children: ReactNode;
    className?: string;
    variation?: DialogVariation;
}

export type DialogVariation = "full" | "dropdown" | "dropup"; 
export type DialogPosition = {
    left: number;
    top: number;
    bottom?: number;
}