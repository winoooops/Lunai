# Lunai's Backend Service

This project is a backend service for an AI chatbot application built using Node.js, TypeScript, and GraphQL. It provides CRUD APIs for managing chat data and configuration settings.

## Project Structure

```
├── src/
│ ├── index.ts # Entry point of the application
│ ├── resolvers/ # GraphQL resolvers
│ │ ├── chatResolvers.ts # Resolvers for chat-related queries and mutations
│ │ └── configResolvers.ts # Resolvers for configuration-related queries and mutations
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

3. **Run the application:**
   ```bash
   npm run dev
   ```

4. **Access the GraphQL Playground:**
   Open your browser and navigate to `http://localhost:4000/graphql` to interact with your GraphQL API.

## API Endpoints

### Message APIs


### Chat APIs

- **Create Chat**
  - **Mutation:** `createChat(input: ChatInput): Chat`
  
- **Read Chats**
  - **Query:** `getChats: [Chat]`
  
- **Update Chat**
  - **Mutation:** `updateChat(id: ID!, input: ChatInput): Chat`
  
- **Delete Chat**
  - **Mutation:** `deleteChat(id: ID!): Boolean`

### Configuration APIs

- **Get Configuration**
  - **Query:** `getConfig: Config`
  
- **Update Configuration**
  - **Mutation:** `updateConfig(input: ConfigInput): Config`

## GraphQL Schema

The GraphQL schema is defined in the `schemas` directory. It includes types for `Chat`, `Message` and `Config`, as well as the necessary queries and mutations.
