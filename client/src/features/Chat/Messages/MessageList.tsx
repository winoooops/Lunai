import { useChatContext } from "@/contexts/ChatContext";
import { MessageBubble } from "./MessageBubble";
import MessageLanding from "./MessagesLanding";

const MessageList: React.FC<{chatId: string}> = ({ chatId }) => {
  const { localMessages: messages, pendingText } = useChatContext();

  if(messages.length === 0) {
    return <MessageLanding />;
  }

  return (
    <>
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          isUser={message.role === "user"}
          content={message.content[0]}
        />
      ))}

      {pendingText.chatId === chatId&& (
        <MessageBubble
          isUser={false}
          content={{ type: "text", text: pendingText.text }}
        />
      )}

    </>
  );
};

export default MessageList;
