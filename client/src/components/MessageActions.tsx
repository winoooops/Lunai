import Button from "../ui/Button"
import { RiAttachment2, RiSendPlane2Line } from "react-icons/ri"

 

const MessageActions: React.FC<{}> = () => {
    return (
        <div className="absolute items-center right-4 top-4 flex bg-slate-800">
            <Button shape="pill" varient="transparent">
                <RiAttachment2 />
            </Button>
            <Button shape="pill" varient="transparent">
                <RiSendPlane2Line />
            </Button>
        </div>
    );
}

export default MessageActions;