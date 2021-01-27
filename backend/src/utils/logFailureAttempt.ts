import { prisma } from '../server/prisma';
import { ATTEMPT_TYPES } from './constants';

export const logFailureAttempt = async (
  type: ATTEMPT_TYPES,
  email: string,
  lastCount: number = 0,
): Promise<undefined> => {
  const upsertQuery = {
    where: { email },
    create: { user: { connect: { email } }, count: lastCount + 1 },
    update: { count: lastCount + 1 },
    select: { count: true },
  };

  switch (type) {
    case ATTEMPT_TYPES.LOGIN:
      await prisma.loginFailedAttempt.upsert(upsertQuery);
      return;
  }
};
