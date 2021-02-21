import { MutationResolvers } from '../graphql/resolvers-types';
import { prisma } from '../server/prisma';
import { getRecentTime } from '../utils/getRecentTime';
import { isReachedLimit } from '../utils/isReachedLimit';
import { createTokenFromUser } from './createTokenFromUser';
import { getUserByCredentials } from './getUserByCredentials';

const DAY = 24 * 60; // a day is 24hs * 60mins
const LIMITS = [
  { period: 1, count: 5 },
  { period: 5, count: 10 },
  { period: 15, count: 20 },
  { period: 30, count: 30 },
  { period: 60, count: 40 },
];

export const login: MutationResolvers['login'] = async (parent, { credentials }) => {
  // Get login failed attempts of this user during last day
  // we will drop the request if the failures are above the thresholds
  const failedAttempts = await prisma.loginFailedAttempt.findMany({
    where: {
      email: credentials.email,
      resolved: false,
      createdAt: { gte: getRecentTime(DAY) },
    },
  });

  if (
    isReachedLimit(
      LIMITS,
      failedAttempts.map(({ createdAt }) => createdAt),
    )
  ) {
    return { success: false, message: 'Too many requests' };
  }

  const user = await getUserByCredentials(credentials);

  if (!user) {
    // log failed attempt
    await prisma.loginFailedAttempt.create({
      data: {
        email: credentials.email,
        resolved: false,
      },
    });

    return { success: false, message: 'Incorrect credentials' };
  }

  // resolve failed attempts
  await prisma.loginFailedAttempt.updateMany({
    where: { email: credentials.email, resolved: false },
    data: { resolved: true },
  });

  const token = createTokenFromUser(user);
  return { success: true, token };
};
