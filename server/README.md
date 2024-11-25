# Lunai's Backend Service

This project is a backend service for an AI chatbot application built using Node.js, TypeScript, and GraphQL. It provides CRUD APIs for managing chat data and configuration settings.

## Project Structure

```
├── src/
│ ├── index.ts # Entry point of the application
│ ├── resolvers/ # GraphQL resolvers
│ │ ├── chatResolvers.ts # Resolvers for chat-related queries and mutations
│ │ └── configResolvers.ts # Resolvers for config:w
uration-related queries and mutations
│ ├── schemas/ # GraphQL schemas
│ │ ├── chatSchema.ts # Schema for chat-related types
│ │ └── configSchema.ts # Schema for configuration-related types
│ ├── types/ # Type definitions
│ │ ├── Chat.ts # Type definitions for chat items
│ │ └── Config.ts # Type definitions for configuration settings
│ ├── context.ts # GraphQL context setup
│ ├── db.ts # Database connection and setup
│ └── utils.ts # Utility functions
├── package.json # Project dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── .env # Environment variables
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
  Before continue, plz sign up at [Anthropic's Website](https://console.anthropic.com/dashboard) and get your personal API [here](https://console.anthropic.com/settings/keys) for the prompts and update the `.env.example` with it and rename the filename to `.env`
   ```
   ANTHROPIC_API_KEY = "your-api-key-here"
   ``` 

   optionally, you could also use [Grok Free API](https://x.ai/api) for the prompt. In this case you need to update the `XAI_API_KEY` with your api key and edit the `ANTHROPIC_BASE_URL` to "" 

3. **Run the application:**
   ```bash
   npm start
   ```

4. **Access the GraphQL Playground:**
   Open your browser and navigate to `http://localhost:4000/graphql` to interact with your GraphQL API.

### Message APIs

The Message APIs allow you to manage and interact with messages in the chat application.

- **Get Messages**: Retrieves all messages stored in the system.
  - **Query:** `messages: [Message]`
  
- **Get Messages from Chat**: Retrieves all messages associated with a specific chat identified by `chatId`
  - **Query:** `messagesFromChat(chatId: String!): [Message]`
  
- **Create Text Reply from Conversation**: Generates a text reply based on the provided messages and associates it with the specified chat.
  - **Mutation:** `createTextReplyFromConversation(messages: [MessageInput], chatId: String!): Message`
  
- **Create Text Reply from Prompt**: Creates a new chat instance from the provided prompt and generates a text reply.
  - **Mutation:** `createTextReplyFromPrompt(prompt: String!): Message`

### Chat APIs

The Chat APIs allow you to manage chat sessions within the application.

- **Create Chat**: Creates a new chat session with the specified input parameters.
  - **Mutation:** `createChat(input: ChatInput): Chat`
  
- **Read Chats**: Retrieves all chat sessions stored in the system.
  - **Query:** `getChats: [Chat]`
  
- **Update Chat**: Updates an existing chat session identified by `id` with the provided input.
  - **Mutation:** `updateChat(id: ID!, input: ChatInput): Chat`
  
- **Delete Chat**: Deletes a chat session identified by `id`.
  - **Mutation:** `deleteChat(id: ID!): Boolean`

### Configuration APIs (Not yet implemented)

- **Get Configuration**
  - **Query:** `getConfig: Config`
  
- **Update Configuration**
  - **Mutation:** `updateConfig(input: ConfigInput): Config`

## GraphQL Schema

The GraphQL schema is defined in the `schemas` directory. It includes types for `Chat`, `Message`, as well as the necessary queries and mutations.

