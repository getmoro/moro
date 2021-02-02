import { ApolloExpressContext } from '../types';
import { prisma } from './prisma';

// This file will make apollo context available for resolvers

export type ApolloContext = {
  user: ApolloExpressContext['req']['user'] | null;
  prisma: typeof prisma;
  isAuthenticated: () => boolean;
  checkMissingPermissions: (neededPermissions: string[], cacheKey: string) => string[];
};

export const apolloContext = ({ req }: ApolloExpressContext): ApolloContext => ({
  prisma,
  user: req.user,
  isAuthenticated: () => !!req.user,
  checkMissingPermissions: (neededPermissions) => {
    console.log(neededPermissions, req.user);
    // get user permissions
    // subtract perm from user permissions
    // return missing permissions list

    return [];
  },
});
