import { Message } from "@LunaiTypes/message"
import { MessageBubble } from "./MessageBubble"
import { ReasoningBubble } from "./ReasoningBubble"

export const MessageItem: React.FC<{message: Message, showReasoning: boolean}> = ({ message, showReasoning }) => {
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
          />
        )
      }
      <MessageBubble
        isUser={role === "user"}
        content={content[0]}
      />
    </>
  )
}