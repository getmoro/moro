import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SERVER_ADDRESS } from '../utils/constants';

export const client = new ApolloClient({
  uri: `${SERVER_ADDRESS}/graphql`,
  cache: new InMemoryCache(),
});
