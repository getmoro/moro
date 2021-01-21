import { MutationResolvers } from '../graphql/resolvers-types';
import { createTokenFromUser } from './createTokenFromUser';
import { hashUserPassword } from './hashUserPassword';

export const resetPassword: MutationResolvers['resetPassword'] = async (
  parent,
  { credentials },
  { prisma },
) => {
  // find the token, email combo
  const row = await prisma.token.findFirst({
    where: { email: credentials.email, token: credentials.token, resolved: false },
    select: { id: true, createdAt: true },
  });

  // check if it exists
  if (!row) {
    return { success: false, message: 'Incorrect request' };
  }

  // check if token row is not old
  console.log(row);

  // resolve the token to prevent reusing
  await prisma.token.update({
    where: { id: row.id },
    data: { resolved: true },
  });

  // update user
  const data = await hashUserPassword(credentials);
  const user = await prisma.user.update({
    where: {
      email: credentials.email,
    },
    data: {
      password: data.password,
    },
  });

  // create jwt token for auth
  const token = createTokenFromUser(user);
  return { success: true, token };
};
