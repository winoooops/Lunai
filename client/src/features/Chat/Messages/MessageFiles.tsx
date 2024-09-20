import { useDnDContext } from "../../../contexts/DnDContext";
import MessageFileCard from "./MessageFileCard";

const MessageFiles: React.FC<{}> = () => {
    const { files, fileCount } = useDnDContext();

    return (
        <div className="border-stone-200 relative bg-stone-800 rounded-lg px-2 py-4 flex-col w-[60%] mx-auto">
            <div className="flex justify-left items-center mb-2 gap-4">
                {files.map((file, index) => (
                    <MessageFileCard key={index} file={file} /> 
                ))}

            </div>    

            <span className="absolute bottom-0 left-0 text-stone-400 mt-2 px-2 pb-1 text-sm">{fileCount} files added</span>
        </div>
    );
}

export default MessageFiles;