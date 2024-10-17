import { RiAttachment2, RiSendPlane2Line } from "react-icons/ri"
import Button, { FileUploadButton } from "../../../ui/Button";

interface MessageActionsProps {
    isFocus: boolean;
}
 

const MessageActions: React.FC<MessageActionsProps> = ({ isFocus }) => {
    const colorScheme = isFocus ? 
        {bg:"bg-slate-200", hover: "hover:bg-slate-400", text:"text-slate-600"} :
        undefined;

    return (
        <div className="absolute items-center right-4 top-4 flex bg-slate-900">
            <FileUploadButton shape="pill">
                <RiAttachment2 />
            </FileUploadButton>
            <Button shape="pill" type="submit" colorScheme={colorScheme} >
                <RiSendPlane2Line />
            </Button>
        </div>
    );
}

export default MessageActions;