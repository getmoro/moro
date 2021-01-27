import { TOKEN_TYPES } from '@prisma/client';
import { MutationResolvers } from '../graphql/resolvers-types';
import { TOKEN_EXPIRE_MINUTES } from '../utils/constants';
import { getRecentTime } from '../utils/getRecentTime';
import { createTokenFromUser } from './createTokenFromUser';
import { hashUserPassword } from './hashUserPassword';

export const resetPassword: MutationResolvers['resetPassword'] = async (
  parent,
  { credentials },
  { prisma },
) => {
  // get the token row
  const row = await prisma.token.findFirst({
    where: {
      token: credentials.token,
      type: TOKEN_TYPES.RESET_PASSWORD,
      resolved: false,
      createdAt: {
        gte: getRecentTime(TOKEN_EXPIRE_MINUTES), // token shouldn't be too old
      },
    },
    select: { id: true, email: true },
    orderBy: { createdAt: 'desc' }, // select last one, in case user received the same token before (by some chance)
  });

  // check if it exists
  if (!row) {
    return { success: false, message: 'Incorrect request' };
  }

  // resolve the token to prevent reusing
  await prisma.token.update({
    where: { id: row.id },
    data: { resolved: true },
  });

  // update user
  const data = await hashUserPassword({
    password: credentials.password,
  });
  const user = await prisma.user.update({
    where: {
      email: row.email,
    },
    data: {
      password: data.password,
    },
  });

  // create jwt token for auth
  const token = createTokenFromUser(user);

  return { success: true, token };
};
