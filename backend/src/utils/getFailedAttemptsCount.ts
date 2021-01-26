import { prisma } from '../server/prisma';
import { ATTEMPT_TYPES } from './constants';

export const getFailedAttemptsCount = async (
  type: ATTEMPT_TYPES,
  email: string,
): Promise<number> => {
  const findQuery = {
    where: { email },
    select: {
      count: true,
    },
  };

  let result;
  switch (type) {
    case ATTEMPT_TYPES.LOGIN:
      result = await prisma.loginFailedAttempt.findUnique(findQuery);
      break;

    case ATTEMPT_TYPES.RESET_PASSWORD:
      result = await prisma.resetPasswordFailedAttempt.findUnique(findQuery);
      break;

    default:
      throw new Error('Wrong attempt type');
  }

  return result ? result.count : 0;
};
