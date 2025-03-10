import { useChatContext } from "@/contexts/ChatContext";
import { MessageBubble } from "./MessageBubble";
import MessageLanding from "./MessagesLanding";
import { MessageItem } from "./MessageItem";
import { ReasoningBubble } from "./ReasoningBubble";

const MessageList: React.FC<{chatId: string}> = ({ chatId }) => {
  const { localMessages: messages, pendingText, pendingReasoning } = useChatContext();

  if(messages.length === 0) {
    return <MessageLanding />;
  }

  return (
    <div className="flex-1 px-4 py-6">
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          message={message}
          showReasoning={index === messages.length - 1 ? true : false}
          index={index}
        />
      ))}

      {pendingReasoning.chatId === chatId && (
        <ReasoningBubble
          reasoningContent={pendingReasoning.text}
          chatId={pendingReasoning.chatId}
          messageId={pendingReasoning.messageId}
          isPending={true}
        />
      )}

      {pendingText.chatId === chatId && (
        <MessageBubble
          isUser={false}
          content={{ type: "text", text: pendingText.text }}
        />
      )}
    </div>
  );
};

export default MessageList;
