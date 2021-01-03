import { User } from '../graphql/resolvers-types';
import { prisma } from '../server/prisma';
import bcrypt from 'bcrypt';

export const getUserByCredentials = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return null;
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return null;
  }

  return user;
};
