import { customAlphabet } from 'nanoid';
import { TOKEN_TYPES } from '@prisma/client';
import { MutationResolvers } from '../graphql/resolvers-types';
import { getRecentTime } from '../utils/getRecentTime';
import { TOKEN_EXPIRE_MINUTES } from '../utils/constants';

const NUMBERS = '0123456789';
const TOKEN_SIZE = 6;
const DAY = 24 * 60; // a day is 24h * 60min
const ATTEMPTS_PER_DAY_LIMIT = 3;

const makePasswordToken = customAlphabet(NUMBERS, TOKEN_SIZE);

export const forgotPassword: MutationResolvers['forgotPassword'] = async (
  parent,
  { credentials },
  { prisma },
) => {
  // get all forgot password requests in the past 24 hours
  const recentTokenRows = await prisma.token.findMany({
    where: {
      email: credentials.email,
      type: TOKEN_TYPES.RESET_PASSWORD,
      resolved: false,
      createdAt: {
        gte: getRecentTime(DAY),
      },
    },
    select: {
      token: true,
      createdAt: true,
    },
  });

  // this will protect the API from brute forcing for tokens on a single email
  if (recentTokenRows.length >= ATTEMPTS_PER_DAY_LIMIT) {
    return { success: false, message: 'Too many requests' };
  }

  // if recently used a valid token and there is still time to use it, email it again
  const lastTokenRow = recentTokenRows.pop();
  if (lastTokenRow && lastTokenRow.createdAt > getRecentTime(TOKEN_EXPIRE_MINUTES / 2)) {
    // email the token
    console.log('Reset password token: ', lastTokenRow.token);

    return { success: true };
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
    select: { id: true },
  });

  if (!user) {
    // Here we are not going to email anything, but
    // shouldn't tell user if the email was not exists to prevent identifiying registered emails by strangers
    return { success: true };
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
