import { ApolloClient, InMemoryCache } from '@apollo/client';

const inMemoryOpts = {
  addTypename: true,
};

const client = new ApolloClient({
  uri: 'https://moonbeam.explorer.subsquid.io/graphql',
  // use InMemoryCache to cache the data
  cache: new InMemoryCache(inMemoryOpts),
});

export default client;
