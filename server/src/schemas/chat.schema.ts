export const ChatSchema = `#graphql
  type Chat {
    id: String!
    title: String!
    created_at: String!
    updated_at: String!
    messages: [Message]
  }

  input ChatInput {
    title: String
    messages: [MessageInput]
  }

  type Query {
    chats: [Chat]
    getChat(id: String!): Chat
  }

  type Mutation {
    createChat(input: ChatInput!): Chat
    updateChat(id: String!, input: ChatInput!): Chat
    deleteChat(id: String!): Boolean
  }
`