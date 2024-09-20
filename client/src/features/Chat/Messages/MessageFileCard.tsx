import { IoIosRemove } from "react-icons/io";
import { useDnDContext } from "../../../contexts/DnDContext";

interface MessageFileCardProps {
    file: File;
}


const MessageFileCard: React.FC<MessageFileCardProps> = ({ file }) => {
    const { handleFileRemove, openFile } = useDnDContext();
    return (
            <div className="grid grid-rows-[1fr_auto] border-gray-200 rounded-md p-2 shadow-md bg-slate-100 gap-2 group relative inline-block p-0.5 mb-1 cursor-pointer" onClick={openFile}>
                <div className="absolute left-1 top-1 z-10">
                    <button className="border-0.5 border-slate-400 bg-slate-900 rounded-full p-1 -translate-x-1/2 -translate-y-1/2 text-slate-200 hover:bg-red-400 transition hover:scale-105 hover:border-0" onClick={() => handleFileRemove(file)}>
                        <IoIosRemove />
                    </button>
                </div>
                <div className="relative grid items-center h-12 w-24">
                    <span className="text-blue-600 text-center">{file.name}</span>
                    <div className="text-center font-bold rounded-lg bg-blue-600 text-sm text-slate-100 mt-3 absolute px-2 left-1/2 top-full z-10 -translate-x-1/2 -translate-y-1/2">
                        {file.type?.toUpperCase()}
                    </div>
                </div>
            </div>
    )
}

export default MessageFileCard;