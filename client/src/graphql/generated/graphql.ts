/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Chat = {
  __typename?: 'Chat';
  created_at: Scalars['String']['output'];
  id: Scalars['String']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  title: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
};

export type ChatInput = {
  messages?: InputMaybe<Array<InputMaybe<MessageInput>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  chatId: Scalars['String']['output'];
  content?: Maybe<Array<Maybe<TextContentBlock>>>;
  id: Scalars['String']['output'];
  model: Scalars['String']['output'];
  role: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type MessageInput = {
  content?: InputMaybe<Array<InputMaybe<TextContentBlockInput>>>;
  role: Scalars['String']['input'];
};

export type MessageStream = {
  __typename?: 'MessageStream';
  chatId: Scalars['String']['output'];
  content?: Maybe<Array<Maybe<TextContentBlock>>>;
  messageId: Scalars['String']['output'];
};

export type MessageStreamComplete = {
  __typename?: 'MessageStreamComplete';
  chatId: Scalars['String']['output'];
  finalContent: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat?: Maybe<Chat>;
  createStreamedTextReplyFromConversation?: Maybe<Message>;
  createStreamedTextReplyFromPrompt?: Maybe<Message>;
  createTextReplyFromConversation?: Maybe<Message>;
  createTextReplyFromPrompt?: Maybe<Message>;
  deleteChat?: Maybe<Scalars['Boolean']['output']>;
  updateChat?: Maybe<Chat>;
};


export type MutationCreateChatArgs = {
  input: ChatInput;
};


export type MutationCreateStreamedTextReplyFromConversationArgs = {
  chatId: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
};


export type MutationCreateStreamedTextReplyFromPromptArgs = {
  prompt: Scalars['String']['input'];
};


export type MutationCreateTextReplyFromConversationArgs = {
  chatId: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
};


export type MutationCreateTextReplyFromPromptArgs = {
  prompt: Scalars['String']['input'];
};


export type MutationDeleteChatArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateChatArgs = {
  id: Scalars['String']['input'];
  input: ChatInput;
};

export type Query = {
  __typename?: 'Query';
  chats?: Maybe<Array<Maybe<Chat>>>;
  getChat?: Maybe<Chat>;
  messages?: Maybe<Array<Maybe<Message>>>;
  messagesFromChat?: Maybe<Array<Maybe<Message>>>;
};


export type QueryGetChatArgs = {
  id: Scalars['String']['input'];
};


export type QueryMessagesFromChatArgs = {
  chatId: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatAdded?: Maybe<Chat>;
  messageStream?: Maybe<MessageStream>;
  messageStreamComplete?: Maybe<MessageStreamComplete>;
};

export type TextContentBlock = {
  __typename?: 'TextContentBlock';
  text: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type TextContentBlockInput = {
  text: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', chats?: Array<{ __typename?: 'Chat', id: string, title: string, created_at: string, updated_at: string } | null> | null };

export type GetMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesQuery = { __typename?: 'Query', messages?: Array<{ __typename?: 'Message', role: string, timestamp: string, id: string, model: string, content?: Array<{ __typename?: 'TextContentBlock', text: string, type: string } | null> | null } | null> | null };

export type MessagesFromChatQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type MessagesFromChatQuery = { __typename?: 'Query', messagesFromChat?: Array<{ __typename?: 'Message', id: string, role: string, model: string, timestamp: string, content?: Array<{ __typename?: 'TextContentBlock', text: string, type: string } | null> | null } | null> | null };

export type GetChatQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetChatQuery = { __typename?: 'Query', getChat?: { __typename?: 'Chat', id: string, title: string, created_at: string, updated_at: string, messages?: Array<{ __typename?: 'Message', role: string, model: string, timestamp: string, content?: Array<{ __typename?: 'TextContentBlock', text: string, type: string } | null> | null } | null> | null } | null };

export type UpdateChatMutationVariables = Exact<{
  updateChatId: Scalars['String']['input'];
  input: ChatInput;
}>;


export type UpdateChatMutation = { __typename?: 'Mutation', updateChat?: { __typename?: 'Chat', id: string, title: string, updated_at: string, messages?: Array<{ __typename?: 'Message', role: string, content?: Array<{ __typename?: 'TextContentBlock', text: string } | null> | null } | null> | null } | null };

export type CreateTextReplyFromPromptMutationVariables = Exact<{
  prompt: Scalars['String']['input'];
}>;


export type CreateTextReplyFromPromptMutation = { __typename?: 'Mutation', createTextReplyFromPrompt?: { __typename?: 'Message', id: string, chatId: string, model: string, role: string, timestamp: string, content?: Array<{ __typename?: 'TextContentBlock', text: string, type: string } | null> | null } | null };

export type CreateStreamedTextReplyFromPromptMutationVariables = Exact<{
  prompt: Scalars['String']['input'];
}>;


export type CreateStreamedTextReplyFromPromptMutation = { __typename?: 'Mutation', createStreamedTextReplyFromPrompt?: { __typename?: 'Message', id: string, chatId: string, timestamp: string, role: string, model: string, content?: Array<{ __typename?: 'TextContentBlock', type: string, text: string } | null> | null } | null };

export type CreateStreamedTextReplyFromConversationMutationVariables = Exact<{
  prompt: Scalars['String']['input'];
  chatId: Scalars['String']['input'];
}>;


export type CreateStreamedTextReplyFromConversationMutation = { __typename?: 'Mutation', createStreamedTextReplyFromConversation?: { __typename?: 'Message', id: string, chatId: string, timestamp: string, role: string, model: string, content?: Array<{ __typename?: 'TextContentBlock', type: string, text: string } | null> | null } | null };

export type CreateTextReplyFromConversationMutationVariables = Exact<{
  prompt: Scalars['String']['input'];
  chatId: Scalars['String']['input'];
}>;


export type CreateTextReplyFromConversationMutation = { __typename?: 'Mutation', createTextReplyFromConversation?: { __typename?: 'Message', id: string, chatId: string, model: string, role: string, timestamp: string, content?: Array<{ __typename?: 'TextContentBlock', text: string, type: string } | null> | null } | null };

export type DeleteChatMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteChatMutation = { __typename?: 'Mutation', deleteChat?: boolean | null };

export type OnMessageStreamSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageStreamSubscription = { __typename?: 'Subscription', messageStream?: { __typename?: 'MessageStream', messageId: string, chatId: string, content?: Array<{ __typename?: 'TextContentBlock', type: string, text: string } | null> | null } | null };

export type OnMessageStreamCompleteSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageStreamCompleteSubscription = { __typename?: 'Subscription', messageStreamComplete?: { __typename?: 'MessageStreamComplete', chatId: string, finalContent: string } | null };


export const GetChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<GetChatsQuery, GetChatsQueryVariables>;
export const GetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}}]} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const MessagesFromChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MessagesFromChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messagesFromChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<MessagesFromChatQuery, MessagesFromChatQueryVariables>;
export const GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatQuery, GetChatQueryVariables>;
export const UpdateChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateChatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChatInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateChatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateChatMutation, UpdateChatMutationVariables>;
export const CreateTextReplyFromPromptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTextReplyFromPrompt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTextReplyFromPrompt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"prompt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTextReplyFromPromptMutation, CreateTextReplyFromPromptMutationVariables>;
export const CreateStreamedTextReplyFromPromptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStreamedTextReplyFromPrompt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStreamedTextReplyFromPrompt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"prompt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}}]} as unknown as DocumentNode<CreateStreamedTextReplyFromPromptMutation, CreateStreamedTextReplyFromPromptMutationVariables>;
export const CreateStreamedTextReplyFromConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStreamedTextReplyFromConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStreamedTextReplyFromConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"prompt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}}},{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}}]} as unknown as DocumentNode<CreateStreamedTextReplyFromConversationMutation, CreateStreamedTextReplyFromConversationMutationVariables>;
export const CreateTextReplyFromConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTextReplyFromConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTextReplyFromConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"prompt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}}},{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<CreateTextReplyFromConversationMutation, CreateTextReplyFromConversationMutationVariables>;
export const DeleteChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteChatMutation, DeleteChatMutationVariables>;
export const OnMessageStreamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessageStream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageStream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}}]}}]}}]} as unknown as DocumentNode<OnMessageStreamSubscription, OnMessageStreamSubscriptionVariables>;
export const OnMessageStreamCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessageStreamComplete"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageStreamComplete"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"finalContent"}}]}}]}}]} as unknown as DocumentNode<OnMessageStreamCompleteSubscription, OnMessageStreamCompleteSubscriptionVariables>;