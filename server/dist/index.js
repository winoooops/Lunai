import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from "@apollo/server";
import { MessageSchema } from "./schemas/message.schema";
import { messageResolvers } from "./resolvers/message.resolver";
const server = new ApolloServer({
    typeDefs: [MessageSchema],
    resolvers: [messageResolvers]
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});
console.log(`server is at ${url}`);
