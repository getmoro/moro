import { MutationResolvers } from '../graphql/resolvers-types';
import { hashUserPassword } from './hashUserPassword';

export const createUser: MutationResolvers['createUser'] = async (
  parent,
  { user },
  { prisma },
) => {
  const data = await hashUserPassword(user);
  return prisma.user.create({ data });
};
