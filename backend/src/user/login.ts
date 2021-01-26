import { MutationResolvers } from '../graphql/resolvers-types';
import { createTokenFromUser } from './createTokenFromUser';
import { getUserByCredentials } from './getUserByCredentials';
import { logFailureAttempt } from '../utils/logFailureAttempt';
import { getFailedAttemptsCount } from '../utils/getFailedAttemptsCount';
import { ATTEMPT_TYPES } from '../utils/constants';

const ATTEMPTS_LIMIT = 3;

export const login: MutationResolvers['login'] = async (parent, { credentials }) => {
  // Get login failed attempts count of this user
  // this count will be reset to zero after a successful login attempt
  // we will ask user for captcha if failures passes the limit
  const failedAttempsCount = await getFailedAttemptsCount(
    ATTEMPT_TYPES.LOGIN,
    credentials.email,
  );

  if (failedAttempsCount >= ATTEMPTS_LIMIT) {
    // UI must know that after several failed attempts it must show a captcha and send the value
    // check the captcha received from user first then continue checking user credentials
  }

  const user = await getUserByCredentials(credentials);

  if (!user) {
    // log failed attempt
    await logFailureAttempt(ATTEMPT_TYPES.LOGIN, credentials.email, failedAttempsCount);

    return { success: false, message: 'Incorrect credentials' };
  }

  // reset failed attempts count
  await logFailureAttempt(ATTEMPT_TYPES.LOGIN, credentials.email, -1);

  const token = createTokenFromUser(user);
  return { success: true, token };
};
