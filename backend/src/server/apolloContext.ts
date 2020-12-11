import { ApolloExpressContext } from "../types";
import { prisma } from "./prisma";

// This file will make apollo context available for resolvers

export type ApolloContext = {
  user: ApolloExpressContext["req"]["user"];
  prisma: typeof prisma;
};

export const apolloContext = ({
  req,
}: ApolloExpressContext): ApolloContext => ({
  prisma,
  user: req.user,
});
