import { MutationResolvers } from '../graphql/resolvers-types';
import { createTokenFromUser } from './createTokenFromUser';
import { getOrMakeUser } from './getOrMakeUser';
import { getTokenValidator } from './utils/getTokenValidator';

export const validateSocialLogin: MutationResolvers['validateSocialLogin'] = async (
  parent,
  { credentials },
) => {
  // get token validator by service
  const validateToken = getTokenValidator(credentials.service);
  if (!validateToken) return { success: false, message: 'Wrong service' };

  try {
    // send received token from UI to the auth service provider for validation
    const userContent = await validateToken(credentials.token);

    // return if there was a problem in token validation
    if (!userContent) {
      return { success: false, message: 'Wrong token' };
    }

    // get user or create new user if doesn't exist
    // TODO: Ask user to create new accound, instead of doing it automatically
    const user = await getOrMakeUser(userContent);

    // create JWT token from user
    const token = createTokenFromUser(user);
    return { success: true, token };
  } catch (err) {
    // if request failed or something bad happened
    return { success: false, message: 'Something went wrong in the request' };
  }
};
