export const MessageSchema = `#graphql
  type TextContentBlock {
    text: String!
    type: String!
  }

  type Message {
    id: String!
    content: [TextContentBlock] 
    role: String!
  }

  input TextContentBlockInput {
    text: String!
    type: String!
  }

  input MessageInput {
    id: String!
    content: [TextContentBlockInput]
    role: String!
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    createTextReplyFromConversation(messages: [MessageInput]!): Message
  }
`