import { QueryResolvers } from '../graphql/resolvers-types';

export const getUsers: QueryResolvers['users'] = async (parent, args, { prisma }) => {
  const allUsers = await prisma.user.findMany({});

  return allUsers;
};
