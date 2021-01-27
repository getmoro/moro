import { v4 as uuidv4 } from 'uuid';
import { TOKEN_TYPES } from '@prisma/client';
import { MutationResolvers } from '../graphql/resolvers-types';
import { getRecentTime } from '../utils/getRecentTime';
import { CLIENT_ADDRESS, TOKEN_EXPIRE_MINUTES } from '../utils/constants';

const DAY = 24 * 60; // a day is 24h * 60min
const ATTEMPTS_PER_DAY_LIMIT = 3;

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
      id: true,
      token: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // this will protect the API from brute forcing for tokens on a single email
  if (recentTokenRows.length >= ATTEMPTS_PER_DAY_LIMIT) {
    return { success: false, message: 'Too many requests' };
  }

  const lastTokenRow = recentTokenRows.pop();

  // don't sent new emails if user just requested one
  if (lastTokenRow && lastTokenRow.updatedAt > getRecentTime(1)) {
    return { success: true, message: 'Wait a minute before asking for a new email' };
  }

  // if recently used a valid token and there is still time to use it, email it again
  if (lastTokenRow && lastTokenRow.createdAt > getRecentTime(TOKEN_EXPIRE_MINUTES / 2)) {
    // update the token timestamp, to be able to check when we sent last email
    await prisma.token.update({
      where: { id: lastTokenRow.id },
      data: { resolved: false },
    });

    // email the token
    console.log(
      'email resend: Reset password token: ',
      `${CLIENT_ADDRESS}/resetPassword?token=${lastTokenRow.token}`,
    );

    return { success: true };
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
    select: { id: true },
  });

  if (!user) {
    // Here we are not going to send an email, but
    // shouldn't tell user if the email was not exists to prevent identifiying registered emails by strangers
    return { success: true };
  }

  const token = uuidv4();
  await prisma.token.create({
    data: {
      user: { connect: { email: credentials.email } },
      token,
      type: TOKEN_TYPES.RESET_PASSWORD,
    },
  });

  // email the reset password link
  console.log(
    'email: Reset password token: ',
    `${CLIENT_ADDRESS}/resetPassword?token=${token}`,
  );

  return { success: true };
};
