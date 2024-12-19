import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

if(!import.meta.env.VITE_BASE_URL) {
  throw new Error("VITE_BASE_URL is not set");
}



// Create an HTTP link
const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_BASE_URL}/graphql`
});

// Create a WebSocket link
const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_BASE_URL}/graphql`,
    connectionParams: {
      // Add any auth tokens if needed
    },
  })
);

// Split links based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Create Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache()
});

export default client;
