import { RiAttachment2, RiSendPlane2Line } from "react-icons/ri"
import Button, { FileUploadButton } from "../../../ui/Button";

interface MessageActionsProps {
    isFocus: boolean;
}
 

const MessageActions: React.FC<MessageActionsProps> = ({ isFocus }) => {
    return (
        <div className="absolute items-center right-4 top-4 flex bg-slate-900">
            <FileUploadButton shape="pill">
                <RiAttachment2 />
            </FileUploadButton>
            <Button shape="pill" type="submit" className={isFocus ? "bg-slate-200 hover:bg-slate-400 text-slate-600" : "bg-slate-900"} >
                <RiSendPlane2Line />
            </Button>
        </div>
    );
}

export default MessageActions;