import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { schemaDirectives } from "./schemaDirectives";
import { ApolloExpressContext } from "src/types";

export const getApolloServer = (
  context: (expressContext: ApolloExpressContext) => any
): ApolloServer =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context,
    schemaDirectives,
  });
