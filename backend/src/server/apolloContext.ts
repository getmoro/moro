import { ApolloExpressContext } from "../types";
import { prisma } from "./prisma";

// This file will make apollo context available for resolvers

export const apolloContext = ({ req }: ApolloExpressContext) => ({
  user: req.user,
  prisma: prisma,
});
