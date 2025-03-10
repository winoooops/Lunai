import { TextContentBlock } from "@LunaiTypes/message";
import ContentWrapper from "@/ui/ContentWrapper";
import { parseContent, useShowText } from "@/hooks/useRenderText";

interface MessageBubbleProps {
  isUser: boolean;
  content: TextContentBlock;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ isUser, content }) => {
  console.log(content.text);
  const results = parseContent(content.text);
  console.log(results);

  return (
    <div className={`${isUser ? 'message-bubble-user': 'message-bubble'} mb-4 mx-auto`}>
      <div className={`inline-block p-3 rounded-lg ${
        isUser ? 'bg-slate-900' : 'bg-transparent w-full text-slate-500'
      }`}>
        <div className="text-container">
          {
            results.map((result, index) => 
              result.isCode ? (
                <ContentWrapper 
                  key={index}
                  content={result.content}
                  language={result.language}
                  isCode={result.isCode}
                />
              ) : (
                <div className="w-full" key={index}>
                  { useShowText(result.content) }
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
};
