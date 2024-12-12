/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetChats {\n    chats {\n      id\n      title\n      created_at\n      updated_at\n    }\n  }\n": types.GetChatsDocument,
    "\n  query GetMessages {\n    messages {\n      content {\n        text\n        type\n      }\n      role\n      timestamp\n      id\n      model\n    }\n  }\n": types.GetMessagesDocument,
    "\n  query MessagesFromChat($chatId: String!) {\n    messagesFromChat(chatId: $chatId) {\n      id\n      role\n      model\n      timestamp\n      content {\n        text\n        type\n      }\n    }\n  }\n": types.MessagesFromChatDocument,
    "\n  query GetChat($id: String!) {\n    getChat(id: $id) {\n      id\n      title\n      created_at\n      updated_at\n      messages {\n        content {\n          text\n          type\n        }\n        role\n        model\n        timestamp\n      }\n    }\n  }\n": types.GetChatDocument,
    "\n  mutation UpdateChat($updateChatId: String!, $input: ChatInput!) {\n    updateChat(id: $updateChatId, input: $input) {\n      id\n      title\n      updated_at\n      messages {\n        content {\n          text\n        }\n        role\n      }\n    }\n  }\n": types.UpdateChatDocument,
    "\n  mutation CreateTextReplyFromPrompt($prompt: String!) {\n    createTextReplyFromPrompt(prompt: $prompt) {\n      id\n      chatId\n      model\n      role\n      timestamp\n      content {\n        text\n        type\n      }\n    }\n  }\n": types.CreateTextReplyFromPromptDocument,
    "\n  mutation CreateStreamedTextReplyFromPrompt($prompt: String!) {\n    createStreamedTextReplyFromPrompt(prompt: $prompt) {\n      id\n      chatId\n      timestamp\n      content {\n        type\n        text\n      }\n      role\n      model\n    }\n  }\n": types.CreateStreamedTextReplyFromPromptDocument,
    "\n  mutation CreateStreamedTextReplyFromConversation($prompt: String!, $chatId: String!) {\n    createStreamedTextReplyFromConversation(prompt: $prompt, chatId: $chatId) {\n      id\n      chatId\n      timestamp\n      content {\n        type\n        text\n      }\n      role\n      model\n    }\n  }\n": types.CreateStreamedTextReplyFromConversationDocument,
    "\n  mutation CreateTextReplyFromConversation($prompt: String!, $chatId: String!) {\n    createTextReplyFromConversation(prompt: $prompt, chatId: $chatId) {\n      id\n      chatId\n      content {\n        text\n        type\n      }\n      model\n      role\n      timestamp\n    }\n  }\n": types.CreateTextReplyFromConversationDocument,
    "\n  mutation DeleteChat($id: String!) {\n    deleteChat(id: $id)\n  }\n": types.DeleteChatDocument,
    "\n  subscription OnMessageStream {\n    messageStream {\n      messageId\n      content {\n        type\n        text\n      }\n      chatId\n    }\n  }\n": types.OnMessageStreamDocument,
    "\n  subscription OnMessageStreamComplete {\n    messageStreamComplete {\n      chatId\n      finalContent\n    }\n  }\n": types.OnMessageStreamCompleteDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChats {\n    chats {\n      id\n      title\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  query GetChats {\n    chats {\n      id\n      title\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessages {\n    messages {\n      content {\n        text\n        type\n      }\n      role\n      timestamp\n      id\n      model\n    }\n  }\n"): (typeof documents)["\n  query GetMessages {\n    messages {\n      content {\n        text\n        type\n      }\n      role\n      timestamp\n      id\n      model\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MessagesFromChat($chatId: String!) {\n    messagesFromChat(chatId: $chatId) {\n      id\n      role\n      model\n      timestamp\n      content {\n        text\n        type\n      }\n    }\n  }\n"): (typeof documents)["\n  query MessagesFromChat($chatId: String!) {\n    messagesFromChat(chatId: $chatId) {\n      id\n      role\n      model\n      timestamp\n      content {\n        text\n        type\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChat($id: String!) {\n    getChat(id: $id) {\n      id\n      title\n      created_at\n      updated_at\n      messages {\n        content {\n          text\n          type\n        }\n        role\n        model\n        timestamp\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetChat($id: String!) {\n    getChat(id: $id) {\n      id\n      title\n      created_at\n      updated_at\n      messages {\n        content {\n          text\n          type\n        }\n        role\n        model\n        timestamp\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateChat($updateChatId: String!, $input: ChatInput!) {\n    updateChat(id: $updateChatId, input: $input) {\n      id\n      title\n      updated_at\n      messages {\n        content {\n          text\n        }\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateChat($updateChatId: String!, $input: ChatInput!) {\n    updateChat(id: $updateChatId, input: $input) {\n      id\n      title\n      updated_at\n      messages {\n        content {\n          text\n        }\n        role\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTextReplyFromPrompt($prompt: String!) {\n    createTextReplyFromPrompt(prompt: $prompt) {\n      id\n      chatId\n      model\n      role\n      timestamp\n      content {\n        text\n        type\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTextReplyFromPrompt($prompt: String!) {\n    createTextReplyFromPrompt(prompt: $prompt) {\n      id\n      chatId\n      model\n      role\n      timestamp\n      content {\n        text\n        type\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStreamedTextReplyFromPrompt($prompt: String!) {\n    createStreamedTextReplyFromPrompt(prompt: $prompt) {\n      id\n      chatId\n      timestamp\n      content {\n        type\n        text\n      }\n      role\n      model\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStreamedTextReplyFromPrompt($prompt: String!) {\n    createStreamedTextReplyFromPrompt(prompt: $prompt) {\n      id\n      chatId\n      timestamp\n      content {\n        type\n        text\n      }\n      role\n      model\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStreamedTextReplyFromConversation($prompt: String!, $chatId: String!) {\n    createStreamedTextReplyFromConversation(prompt: $prompt, chatId: $chatId) {\n      id\n      chatId\n      timestamp\n      content {\n        type\n        text\n      }\n      role\n      model\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStreamedTextReplyFromConversation($prompt: String!, $chatId: String!) {\n    createStreamedTextReplyFromConversation(prompt: $prompt, chatId: $chatId) {\n      id\n      chatId\n      timestamp\n      content {\n        type\n        text\n      }\n      role\n      model\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTextReplyFromConversation($prompt: String!, $chatId: String!) {\n    createTextReplyFromConversation(prompt: $prompt, chatId: $chatId) {\n      id\n      chatId\n      content {\n        text\n        type\n      }\n      model\n      role\n      timestamp\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTextReplyFromConversation($prompt: String!, $chatId: String!) {\n    createTextReplyFromConversation(prompt: $prompt, chatId: $chatId) {\n      id\n      chatId\n      content {\n        text\n        type\n      }\n      model\n      role\n      timestamp\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChat($id: String!) {\n    deleteChat(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteChat($id: String!) {\n    deleteChat(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnMessageStream {\n    messageStream {\n      messageId\n      content {\n        type\n        text\n      }\n      chatId\n    }\n  }\n"): (typeof documents)["\n  subscription OnMessageStream {\n    messageStream {\n      messageId\n      content {\n        type\n        text\n      }\n      chatId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnMessageStreamComplete {\n    messageStreamComplete {\n      chatId\n      finalContent\n    }\n  }\n"): (typeof documents)["\n  subscription OnMessageStreamComplete {\n    messageStreamComplete {\n      chatId\n      finalContent\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;