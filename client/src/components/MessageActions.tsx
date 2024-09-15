import Button from "../ui/Button"
import { RiAttachment2, RiSendPlane2Line } from "react-icons/ri"

interface MessageActionsProps {
    isFocus: boolean;
}
 

const MessageActions: React.FC<MessageActionsProps> = ({ isFocus }) => {
    const colorScheme = isFocus ? 
        {bg:"bg-slate-200", hover: "hover:bg-slate-400", text:"text-slate-600"} :
        undefined;

    return (
        <div className="absolute items-center right-4 top-4 flex bg-slate-900">
            <Button shape="pill">
                <RiAttachment2 />
            </Button>
            <Button type="submit" shape="pill" colorScheme={colorScheme} >
                <RiSendPlane2Line />
            </Button>
        </div>
    );
}

export default MessageActions;