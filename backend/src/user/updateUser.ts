import { Prisma } from '@prisma/client';
import { MutationResolvers } from '../graphql/resolvers-types';

export const updateUser: MutationResolvers['updateUser'] = async (
  parent,
  { user },
  { prisma, user: currentUser },
) => {
  const { id, email, name, accessList } = user;

  // if user tries to change own access
  if (currentUser?.id === user.id) {
    return {};
  }

  let data: Prisma.UserUpdateInput = {};
  if (email) data = { ...data, email };
  if (name) data = { ...data, name };
  if (accessList) {
    // check if user has these accessList herself
    data = { ...data, accessList };
  }

  return prisma.user.update({ where: { id }, data });
};
