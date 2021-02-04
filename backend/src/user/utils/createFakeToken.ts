import { Token, TOKEN_TYPES } from '@prisma/client';
import { prisma } from '../../server/prisma';
import { getRecentTime } from '../../utils/getRecentTime';

// helper function for resetPassword
export const createFakeToken = (
  email: string,
  resolved: boolean,
  time: number,
): Promise<Token> =>
  prisma.token.create({
    data: {
      resolved,
      user: { connect: { email } },
      token: '123456',
      type: TOKEN_TYPES.RESET_PASSWORD,
      createdAt: getRecentTime(time),
    },
  });
