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
    createTextReplyFromConversation(messages: [MessageInput]!, chatId: String!): Message
    createTextReplyFromPrompt(prompt: String!): Message
  }
`