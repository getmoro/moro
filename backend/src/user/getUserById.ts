import { User } from '../graphql/resolvers-types';
import { prisma } from '../server/prisma';

export const getUserById = (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};
