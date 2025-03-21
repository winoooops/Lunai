import { Message } from "@LunaiTypes/message";
import { useEffect, useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";

interface ReasoningBubbleProps {
  reasoningContent: string;
  chatId: Message["chatId"];
  messageId: Message["id"];
  showReasoning?: boolean;
  isPending?: boolean;
}

export const ReasoningBubble: React.FC<ReasoningBubbleProps> = ({ reasoningContent, showReasoning = false, isPending = false }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(showReasoning);

  useEffect(() => {
    if(isPending) {
      setIsExpanded(true);
    }
  }, [isPending]);

  return (
    <div className="reasoning-bubble ml-4">
      <div className="p-1 border-l-2 border-gray-400 pl-4">
        <div className="text-xs text-gray-400">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <FaAngleDoubleDown className={`${isExpanded ? "rotate-180" : ""}`} />
            <span>Reasoning</span>
          </div>
          {isExpanded && (
            <p className="mt-1">
              {reasoningContent}
            </p>
          )}
        </div>
      </div>
    </div>
  ); 
}