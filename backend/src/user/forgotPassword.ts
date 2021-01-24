import { customAlphabet } from 'nanoid';
import { TOKEN_TYPES } from '@prisma/client';
import { MutationResolvers } from '../graphql/resolvers-types';
import { NUMBERS, TOKEN_SIZE, TOKEN_EXPIRE_MINUTES } from '../utils/constants';

const makePasswordToken = customAlphabet(NUMBERS, TOKEN_SIZE);
const getRecentTime = (min: number): Date => {
  const now = new Date();
  return new Date(now.getTime() - min * 60000);
};

export const forgotPassword: MutationResolvers['forgotPassword'] = async (
  parent,
  { credentials },
  { prisma },
) => {
  // check if recently used one
  const recentTokens = await prisma.token.findMany({
    where: {
      email: credentials.email,
      type: TOKEN_TYPES.RESET_PASSWORD,
      resolved: false,
      createdAt: {
        gte: getRecentTime(TOKEN_EXPIRE_MINUTES / 2),
      },
    },
    select: {
      token: true,
      createdAt: true,
    },
  });
  const lastToken = recentTokens.pop()?.token;

  // if recently used a valid token, email it again
  if (lastToken) {
    // email the token
    console.log('Reset password token: ', lastToken);

    return { success: true };
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
    select: { id: true },
  });

  if (!user) {
    return { success: false, message: 'Incorrect email' };
  }

  const token = makePasswordToken();
  await prisma.token.create({
    data: {
      user: { connect: { email: credentials.email } },
      token,
      type: TOKEN_TYPES.RESET_PASSWORD,
    },
  });

  // email the token
  console.log('Reset password token: ', token);

  return { success: true };
};
