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
  } catch {
    return { success: false, message: 'Registering the new user went wrong' };
  }
};
