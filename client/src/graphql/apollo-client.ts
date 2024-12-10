import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";


const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_BASE_URL}/graphql`,
});

const wsLink = new GraphQLWsLink({
  uri: `${import.meta.env.VITE_BASE_URL}/subscriptions`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
