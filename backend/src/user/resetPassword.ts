import { TOKEN_TYPES } from '@prisma/client';
import { MutationResolvers } from '../graphql/resolvers-types';
import { ATTEMPT_TYPES, TOKEN_EXPIRE_MINUTES } from '../utils/constants';
import { getFailedAttemptsCount } from '../utils/getFailedAttemptsCount';
import { getRecentTime } from '../utils/getRecentTime';
import { logFailureAttempt } from '../utils/logFailureAttempt';
import { createTokenFromUser } from './createTokenFromUser';
import { hashUserPassword } from './hashUserPassword';

const ATTEMPTS_LIMIT = 3;

export const resetPassword: MutationResolvers['resetPassword'] = async (
  parent,
  { credentials },
  { prisma },
) => {
  // Get reset password failed attempts count of this user
  // this count will be reset to zero after a successful reset password attempt
  const failedAttempsCount = await getFailedAttemptsCount(
    ATTEMPT_TYPES.RESET_PASSWORD,
    credentials.email,
  );

  // this will protect the API from brute forcing tokens on a single email
  if (failedAttempsCount >= ATTEMPTS_LIMIT) {
    // log failed attempt
    await logFailureAttempt(
      ATTEMPT_TYPES.RESET_PASSWORD,
      credentials.email,
      failedAttempsCount,
    );

    return { success: false, message: 'Too many requests' };
  }

  // find the token-email combo
  const row = await prisma.token.findFirst({
    where: {
      email: credentials.email,
      token: credentials.token,
      type: TOKEN_TYPES.RESET_PASSWORD,
      resolved: false,
      createdAt: {
        gte: getRecentTime(TOKEN_EXPIRE_MINUTES), // token shouldn't be too old
      },
    },
    select: { id: true },
    orderBy: { createdAt: 'desc' }, // select last one, in case user received the same token before (by some chance)
  });

  // check if it exists
  if (!row) {
    // log failed attempt
    await logFailureAttempt(
      ATTEMPT_TYPES.RESET_PASSWORD,
      credentials.email,
      failedAttempsCount,
    );

    return { success: false, message: 'Incorrect request' };
  }

  // resolve the token to prevent reusing
  await prisma.token.update({
    where: { id: row.id },
    data: { resolved: true },
  });

  // cleanup failed attempts
  await logFailureAttempt(ATTEMPT_TYPES.RESET_PASSWORD, credentials.email, -1);

  // update user
  const data = await hashUserPassword(credentials);
  const user = await prisma.user.update({
    where: {
      email: credentials.email,
    },
    data: {
      password: data.password,
    },
  });

  // create jwt token for auth
  const token = createTokenFromUser(user);
  return { success: true, token };
};
