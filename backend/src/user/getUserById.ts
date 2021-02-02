import { User } from '@prisma/client';
import { prisma } from '../server/prisma';

export const getUserById = (id: number): Promise<Omit<User, 'password'> | null> =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, accessList: true },
  });
