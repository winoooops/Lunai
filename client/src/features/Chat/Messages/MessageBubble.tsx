import { TextContentBlock } from "@LunaiTypes/message";
import ContentWrapper from "@/ui/ContentWrapper";

interface MessageBubbleProps {
  isUser: boolean;
  content: TextContentBlock;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ isUser, content }) => {
  const parseContent = (text: string) => {
    // Check if the content contains a code block
    const codeBlockMatch = text.match(/^```(\w+)?\n([\s\S]*?)```$/m);
    
    if (codeBlockMatch) {
      const [fullMatch, language = 'text', code] = codeBlockMatch;
      // Replace only the code block portion, preserving any other text
      const processedContent = text.replace(fullMatch, code.trim());
      return {
        isCode: true,
        language: language || 'text',
        content: processedContent
      };
    }

    return {
      isCode: false,
      content: text
    };
  };

  const renderedContent = parseContent(content.text);


  return (
    <div className={`${isUser ? 'message-bubble-user': 'message-bubble'} mb-4 mx-auto`}>
      <div className={`inline-block p-3 rounded-lg ${
        isUser ? 'bg-slate-900' : 'bg-transparent w-full text-slate-500'
      }`}>
        <div className="text-container">
          {renderedContent.isCode ? (
            <ContentWrapper 
              content={renderedContent.content}
              language={renderedContent.language}
              // isCode={renderedContent.isCode}
            />
          ) : (
            <div className="w-full">
              {renderedContent.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
