import { graphql } from "./generated";

export const GET_CHATS = graphql(`
  query GetChats {
    chats {
      id
      title
      created_at
      updated_at
    }
  }
`);

export const GET_MESSAGES = graphql(`
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
      metadata {
        reasoning_content
      }
    }
  }
`);

export const GET_MESSAGES_BY_CHAT = graphql(`
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
      metadata {
        reasoning_content
      }
    }
  }
`);

export const GET_CHAT = graphql(`
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
        metadata {
          reasoning_content
        }
      }
    }
  }
`);

export const UPDATE_CHAT = graphql(`
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
`);

export const CREATE_TEXT_REPLY_FROM_PROMPT = graphql(`
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
      metadata {
        reasoning_content
      }
    }
  }
`);

export const CREATE_STREAMED_TEXT_REPLY_FROM_PROMPT = graphql(`
  mutation CreateStreamedTextReplyFromPrompt($prompt: String!) {
    createStreamedTextReplyFromPrompt(prompt: $prompt) {
      success
      chatId
      error
    }
  }
`);

export const CREATE_STREAMED_TEXT_REPLY_FROM_CONVERSATION = graphql(`
  mutation CreateStreamedTextReplyFromConversation($prompt: String!, $chatId: String!) {
    createStreamedTextReplyFromConversation(prompt: $prompt, chatId: $chatId) {
      success
      chatId
      error
    }
  }
`);

export const CREATE_TEXT_REPLY_FROM_CONVERSATION = graphql(`
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
      metadata {
        reasoning_content
      }
    }
  }
`);

export const DELETE_CHAT = graphql(`
  mutation DeleteChat($id: String!) {
    deleteChat(id: $id)
  }
`);

export const MESSAGE_STREAM = graphql(`
  subscription OnMessageStream {
    messageStream {
      messageId
      content {
        type
        text
      }
      chatId
    }
  }
`);

export const MESSAGE_STREAM_COMPLETE = graphql(`
  subscription OnMessageStreamComplete {
    messageStreamComplete {
      chatId
      finalContent
      message {
        content {
          text
          type
        }
        role
        timestamp
        id
        model
        chatId
        metadata {
          reasoning_content
        }
      }
    }
  }
`);

export const GET_CONFIG = graphql(`
  query GetConfig {
    config {
      system
      max_tokens
      temperature
      stream
    }
  }
`);

export const SET_CONFIG = graphql(`
  mutation SetConfig($config: ConfigInput!) {
    setConfig(config: $config) {
      system
      max_tokens
      temperature
      stream
    }
  }
`);

export const GET_MODELS = graphql(`
  query GetModels {
    models {
      id
      name
      owned_by
      active
    }
  }
`);

export const GET_ACTIVE_MODEL = graphql(`
  query GetActiveModel {
    activeModel {
      id
      name
      owned_by
      active
    }
  }
`);

export const SET_ACTIVE_MODEL = graphql(`
  mutation SetActiveModel($id: String!) {
    setActiveModel(id: $id)
  }
`);

export const REASONING_STREAM = graphql(`
  subscription OnReasoningStream {
    reasoningStream {
      messageId
      content {
        type
        text
      }
      chatId
    }
  }
`);

export const REASONING_STREAM_COMPLETE = graphql(`
  subscription OnReasoningStreamComplete {
    reasoningStreamComplete {
      chatId
      finalContent
    }
  }
`);