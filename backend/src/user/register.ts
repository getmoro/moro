import { MutationResolvers } from '../graphql/resolvers-types';
import { createTokenFromUser } from './createTokenFromUser';
import { hashUserPassword } from './hashUserPassword';

export const register: MutationResolvers['register'] = async (
  parent,
  { user: userInput },
  { prisma },
) => {
  try {
    const data = await hashUserPassword(userInput);
    const user = await prisma.user.create({ data });
    const token = createTokenFromUser(user);
    return { success: true, token };
  } catch (e) {
    // If error is "Unique constraint failed" which means there is already a row with the same email.
    // https://www.prisma.io/docs/concepts/components/prisma-client/error-reference
    if (e.code === 'P2002') {
      return { success: false, message: 'This email is already registered' };
    }
    return { success: false, message: 'Registering the new user went wrong' };
  }
};
