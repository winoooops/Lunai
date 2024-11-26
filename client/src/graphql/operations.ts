import { gql } from "@apollo/client";

export const GET_CHATS = gql`
  query GetChats{
    chats {
      id
      title
      created_at
      updated_at
    } 
  }
`;

