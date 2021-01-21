import { MutationResolvers } from '../graphql/resolvers-types';
import { createTokenFromUser } from './createTokenFromUser';
import { getUserByCredentials } from './getUserByCredentials';

export const login: MutationResolvers['login'] = async (parent, { credentials }) => {
  const user = await getUserByCredentials(credentials);

  if (!user) {
    return { success: false, message: 'Incorrect credentials' };
  }

  const token = createTokenFromUser(user);
  return { success: true, token };
};
