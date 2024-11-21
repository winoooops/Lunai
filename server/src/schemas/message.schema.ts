export const MessageSchema = `#graphql
  type TextContentBlock {
    text: String!
    type: String!
  }

  type Message {
    content: [TextContentBlock] 
    role: String!
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
    createTextReplyFromConversation(messages: [MessageInput]!): Message
  }
`