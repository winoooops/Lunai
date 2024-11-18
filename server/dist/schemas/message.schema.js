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

  type Query {
    messages: [Message]
  }

  type Mutation {
    getTextPrompt(prompt: String!): Message
  }
`;
