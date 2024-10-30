import { DialogButton } from "../ui/Dialog";
import DeleteModal from "./DeleteModal";

export interface DeleteButtonProps {
  id: string;
  children: React.ReactNode;
  onDelete: () => void;
  className?: string;
  type?: "full" | "dropdown" | "dropup"
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, children, className = "", onDelete, type="dropdown" }) => {
  return (
    <>
      <DialogButton 
        id={id} variation={type} 
        className={className}
        content={<DeleteModal onDelete={onDelete}/>}  
      >
        {children}
      </DialogButton>
    </>
  );
}

export default DeleteButton;