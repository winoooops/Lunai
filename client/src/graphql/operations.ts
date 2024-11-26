import { gql } from "@apollo/client";

export const GET_CHATS = gql`
  query GetChats {
    chats {
      id
      title
      created_at
      updated_at
    } 
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      content {
        text
        type
      }
      role
      timestamp
      id
      model
    }
  }
`;

export const GET_MESSAGES_BY_CHAT = gql`
  query GetMessagesByChat($chatId: String!) {
    getChat(chatId: $chatId) {
      messages {
        id
        role
        model
        timestamp
        content {
          text
          type
        }
      }
    }
  }

`;

export const GET_CHAT = gql`
  query GetChat($chatId: String!) {
    getChat(chatId: $chatId) {
      id
      title
      created_at
      updated_at
      messages {
        chatId
        content {
          text
        }
        role
        id
        timestamp
        model
      }
    }
  }
`;