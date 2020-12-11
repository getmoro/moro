import { QueryResolvers } from "../graphql/resolvers-types";

export const getUsers: QueryResolvers["users"] = async (parent, args, ctx) => {
  const allUsers = await ctx.prisma.user.findMany({});

  return allUsers;
};
