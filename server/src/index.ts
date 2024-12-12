import { config } from "dotenv"
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from "@apollo/server";
import { MessageSchema } from "./schemas/message.schema";
import { messageResolvers } from "./resolvers/message.resolver";
import { ChatSchema } from './schemas/chat.schema';
import { chatResolvers } from './resolvers/chat.resolver';
import { PubSub } from "graphql-subscriptions";

// load environment variables
config();

// Create a single PubSub instance to be shared
const pubsub = new PubSub();

const schema = makeExecutableSchema({
  typeDefs: [MessageSchema, ChatSchema],
  resolvers: [messageResolvers, chatResolvers]
});

const app = express();
const httpServer = createServer(app);

// WebSocket server setup
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Pass pubsub through WebSocket context
const serverCleanup = useServer({
  schema,
  context: () => {
    return {
      pubsub
    };
  }
}, wsServer);

// Apollo server setup
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        }
      }
    }
  ]
});

await server.start();

// Pass pubsub through HTTP context
app.use('/graphql', 
  cors<cors.CorsRequest>(), 
  bodyParser.json(),
  expressMiddleware(server, {
    context: async () => ({
      pubsub
    })
  })
);

// start the http server
const PORT = Number(process.env.PORT) || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
