import { DialogPosition, DialogVariation } from "@/ui/Dialog";
import { createContext, ReactNode, useContext, useRef, useState } from "react";

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

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [activeDialogId, setActiveDialogId] = useState<string | null>(null);
  const [variation, setVariation] = useState<DialogVariation>("full");
  const [position, setPosition] = useState<DialogPosition>({ left: 0, top: 0});
  const dialogRef = useRef<HTMLDivElement>(null); 

  const openDialog = (id: string, content: ReactNode, dialogVariation: DialogVariation = "full", dialogPosition: DialogPosition = {top: 0, left:0}) => {
    setIsOpen(true);
    setVariation(dialogVariation);
    setContent(content);
    setActiveDialogId(id);
    setPosition(dialogPosition);
  }

  const closeDialog = () => {
      setContent(null);
      setActiveDialogId(null);
      setIsOpen(false);
  }
    

  return (
      <DialogContext.Provider value={{ openDialog, closeDialog, isOpen, content, activeDialogId, variation, position, dialogRef }}>
          {children}
      </DialogContext.Provider>
  );
}

export const useDialog = () => {
  const context = useContext(DialogContext);
  if(!context) {
      throw new Error("useDialog must be used within a DialogProvider");
  }

  return context;
}