import { config } from "dotenv"
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import cors from 'cors';
import { ApolloServer } from "@apollo/server";
import { MessageSchema } from "./schemas/message.schema";
import { messageResolvers } from "./resolvers/message.resolver";
import { ChatSchema } from './schemas/chat.schema';
import { chatResolvers } from './resolvers/chat.resolver';

config();

const schema = makeExecutableSchema({
  typeDefs: [MessageSchema, ChatSchema],
  resolvers: [messageResolvers, chatResolvers]
});

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
});

const serverCleanup = useServer({ schema }, wsServer);

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


app.use('/graphql', 
  cors<cors.CorsRequest>(), 
  express.json(),
  expressMiddleware(server)
);

const PORT = Number(process.env.PORT) || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
