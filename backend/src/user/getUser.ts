import { QueryResolvers } from '../graphql/resolvers-types';

export const getUser: QueryResolvers['user'] = async (parent, args, ctx) => {
  return ctx.user ? ctx.user : {};
};
