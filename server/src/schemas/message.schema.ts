export const MessageSchema = `#graphql
  type TextContentBlock {
    text: String!
    type: String!
  }

  type Message {
    content: [TextContentBlock] 
    role: String!
    timestamp: String!
    id: String!
    model: String!
    chatId: String!
  }

  type MessageStream {
    chatId: String!
    messageId: String!
    content: [TextContentBlock]
  }

  type MessageStreamComplete {
    chatId: String!
    finalContent: String!
  }

  type Subscription {
    messageStream: MessageStream
    messageStreamComplete: MessageStreamComplete
  }

  input TextContentBlockInput {
    text: String!
    type: String!
  }

  input MessageInput {
    content: [TextContentBlockInput]
    role: String!
  }

  type Query {
    messages: [Message]
    messagesFromChat(chatId: String!): [Message]
  }

  type Mutation {
    createTextReplyFromConversation(prompt: String!, chatId: String!): Message
    createTextReplyFromPrompt(prompt: String!): Message
    createStreamedTextReplyFromPrompt(prompt: String!): Message
    createStreamedTextReplyFromConversation(prompt: String!, chatId: String!): Message
  }
`