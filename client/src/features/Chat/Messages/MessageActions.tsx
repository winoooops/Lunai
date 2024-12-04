import { RiAttachment2 } from "react-icons/ri"
import { FileUploadButton } from "../../../ui/Button";

interface MessageActionsProps {
    children: React.ReactNode;
}
 

const MessageActions: React.FC<MessageActionsProps> = ({ children }) => {
    return (
        <div className="absolute items-center right-4 top-4 flex bg-slate-900">
            <FileUploadButton shape="pill">
                <RiAttachment2 />
            </FileUploadButton>
            {children}
        </div>
    );
}

export default MessageActions;