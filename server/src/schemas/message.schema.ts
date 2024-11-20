export const MessageSchema = `#graphql
  type LunaiMessage {
    content: String! 
    role: String!
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    createTextReplyFromConversation(messages: [LunaiMessage]!): LunaiMessage
  }
`