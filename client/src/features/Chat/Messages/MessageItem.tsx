import { Message } from "@LunaiTypes/message"
import { MessageBubble } from "./MessageBubble"
import { ReasoningBubble } from "./ReasoningBubble"

export const MessageItem: React.FC<{message: Message, showReasoning: boolean, index: number}> = ({ message, showReasoning, index }) => {
  if(!message) return null;

  const { content, role, metadata, chatId, id } = message;

  return (
    <>
      {
        role === "assistant" && metadata?.reasoning_content && (
          <ReasoningBubble
            reasoningContent={metadata?.reasoning_content}
            chatId={chatId}
            messageId={id}
            showReasoning={showReasoning}
            key={index}
          />
        )
      }
      <MessageBubble
        key={index}
        isUser={role === "user"}
        content={content[0]}
      />
    </>
  )
}