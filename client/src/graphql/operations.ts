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
  query MessagesFromChat($chatId: String!) {
    messagesFromChat(chatId: $chatId) {
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
`;

export const GET_CHAT = gql`
  query GetChat($id: String!) {
    getChat(id: $id) {
      id
      title
      created_at
      updated_at
      messages {
        content {
          text
          type
        }
        role
        model
        timestamp
      }
    }
  }
`;

export const UPDATE_CHAT = gql`
  mutation UpdateChat($updateChatId: String!, $input: ChatInput!) {
    updateChat(id: $updateChatId, input: $input) {
      id
      title
      updated_at
      messages {
        content {
          text
        }
        role
      }
    }
  }
`;

export const CREATE_TEXT_REPLY_FROM_PROMPT = gql`
  mutation CreateTextReplyFromPrompt($prompt: String!) {
    createTextReplyFromPrompt(prompt: $prompt) {
      id
      chatId
      model
      role
      timestamp
      content {
        text
        type
      }
    }
  }
`

export const CREATE_TEXT_REPLY_FROM_CONVERSATION = gql`
  mutation CreateTextReplyFromConversation($prompt: String!, $chatId: String!) {
    createTextReplyFromConversation(prompt: $prompt, chatId: $chatId) {
      id
      chatId
      content {
        text
        type
      }
      model
      role
      timestamp
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation DeleteChat($id: String!) {
    deleteChat(id: $id)
  }
`

export const MESSAGE_STREAM = gql`
  subscription OnMessageStream {
    messageStream {
      id
      content {
        type
        text
      }
      role
      timestamp
      model
      chatId
    }
  }
`;

export const CREATE_STREAMED_TEXT_REPLY_FROM_PROMPT = gql`
  mutation CreateStreamedTextReplyFromPrompt($prompt: String!) {
    createStreamedTextReplyFromPrompt(prompt: $prompt) {
      id
      content {
        type
        text
      }
      role
      timestamp
      model
      chatId
    }
  }
`;
