import { customAlphabet } from 'nanoid';
import { TOKEN_TYPES } from '@prisma/client';
import { MutationResolvers } from '../graphql/resolvers-types';
import { NUMBERS, TOKEN_SIZE } from '../utils/constants';

const makePasswordToken = customAlphabet(NUMBERS, TOKEN_SIZE);

export const forgotPassword: MutationResolvers['forgotPassword'] = async (
  parent,
  { credentials },
  { prisma },
) => {
  // check if recently used one
  // prisma.token.find

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
