import { User } from '@prisma/client';
import { prisma } from '../server/prisma';
import { UserContent } from './types';

export const getOrMakeUser = async (userContent: UserContent): Promise<User> => {
  const { email } = userContent;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return await prisma.user.create({ data: userContent });
  }
  return user;
};
