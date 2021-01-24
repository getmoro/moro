import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { ValidateDirectiveVisitor } from '@profusion/apollo-validation-directives';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { schemaDirectives } from './schemaDirectives';
import { ApolloExpressContext } from '../types';

export const getApolloServer = <T = any>(
  context: (expressContext: ApolloExpressContext) => T,
): ApolloServer => {
  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    schemaDirectives,
    resolvers,
  });

  ValidateDirectiveVisitor.addValidationResolversToSchema(schema);

  return new ApolloServer({ schema, context });
};
