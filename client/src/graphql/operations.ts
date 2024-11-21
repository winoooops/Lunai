import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation createTextReplyFromConversation($messages: [MessageInput!]) {
    createTextReplyFromConversation(messages: $messages) {
      content {
        text
        type
      }
      role
      id
    }
  }
`;