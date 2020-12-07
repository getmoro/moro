import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { schemaDirectives } from "./schemaDirectives";
import { ApolloContext } from "src/types";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: ApolloContext) => ({
    user: req.user,
  }),
  schemaDirectives,
});
