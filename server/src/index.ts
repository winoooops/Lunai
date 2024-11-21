import { startStandaloneServer } from '@apollo/server/standalone';
import {config} from "dotenv"

import { ApolloServer } from "@apollo/server";
import { MessageSchema } from "./schemas/message.schema";
import { messageResolvers } from "./resolvers/message.resolver";
import { ChatSchema } from './schemas/chat.schema';
import { chatResolvers } from './resolvers/chat.resolver';

config();


const server = new ApolloServer({
  typeDefs: [MessageSchema, ChatSchema],
  resolvers: [messageResolvers, chatResolvers]
})

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) || 4000 }
});

console.log(`server is at ${url}`);