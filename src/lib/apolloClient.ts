
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'https://navitronix.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': '6Jq3rrhRADpfTtekef8mvs7obb2nzMbE59fo5DdN8NEMyPVUaekU7igt1qLNb1fG',
  },
});

const wsLink = typeof window !== 'undefined'
  ? new GraphQLWsLink(
      createClient({
        url: 'wss://supabase-nephy-dev.hasura.app/v1/graphql', // Updated to match HTTP URL
        connectionParams: {
          headers: {
            'x-hasura-admin-secret': '6Jq3rrhRADpfTtekef8mvs7obb2nzMbE59fo5DdN8NEMyPVUaekU7igt1qLNb1fG',
          },
        },
        retryAttempts: 3,
        shouldRetry: () => true,
      })
    )
  : null;

const splitLink = typeof window !== 'undefined' && wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;
