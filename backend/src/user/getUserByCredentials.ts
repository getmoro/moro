import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { prisma } from '../server/prisma';
import { CredentialsInput } from '../graphql/resolvers-types';

export const getUserByCredentials = async ({
  email,
  password,
}: CredentialsInput): Promise<User | null> => {
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
