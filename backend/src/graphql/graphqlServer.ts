import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { schemaDirectives } from './schemaDirectives';
import { ApolloExpressContext } from '../types';

export const getApolloServer = <T = any>(
  context: (expressContext: ApolloExpressContext) => T,
): ApolloServer =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context,
    schemaDirectives,
  });
