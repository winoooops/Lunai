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
import { PubSub } from "graphql-subscriptions";
import { loadFiles } from "@graphql-tools/load-files";

import { messageResolvers } from "./resolvers/message.resolver";
import { chatResolvers } from "./resolvers/chat.resolver";
import { configResolvers } from "./resolvers/config.resolver";
import { modelResolvers } from "./resolvers/model.resolver";

// load environment variables
config();

// Create a single PubSub instance to be shared
const pubsub = new PubSub();

// load Graphql type definitions and resolvers 
const typeDefs = await loadFiles('../@graphql/schema/**/*.graphql');
const resolvers = [messageResolvers, chatResolvers, configResolvers, modelResolvers];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
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
