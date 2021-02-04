import { Prisma } from '@prisma/client';
import { difference, intersection } from 'lodash';
import { MutationResolvers } from '../graphql/resolvers-types';
import { isDevEnv } from '../utils/isDevEnv';
import { allPermissions } from './permissions/allPermissions';
import { userFields } from './utils/constants';

export const updateUser: MutationResolvers['updateUser'] = async (
  parent,
  { user },
  { prisma, user: currentUser },
) => {
  const { id, email, name, permissions } = user;

  // if user tries to change own access
  // exceptionally skip this check if it's a development environment
  if (currentUser?.id === user.id && !isDevEnv()) return {};

  const userToUpdate = await prisma.user.findUnique({
    where: { id },
    select: { permissions: true },
  });
  // if the user doesn't exist
  if (!userToUpdate) return {};

  let data: Prisma.UserUpdateInput = {};
  if (email) data = { ...data, email };
  if (name) data = { ...data, name };

  // skip restrictions on the permission changes on the dev environments
  if (isDevEnv() && permissions) {
    data = { ...data, permissions };
  } else if (permissions) {
    // check if user has these permissions herself
    const newPermissions = intersection(permissions, currentUser?.permissions);

    // if admin is removing some permissions from user, but doesn't have them herself
    const permissionsThatAdminHasNot = difference(
      allPermissions,
      currentUser?.permissions || [],
    );
    const shouldNotBeRemovedPermissions = intersection(
      userToUpdate.permissions,
      permissionsThatAdminHasNot,
    );

    data = {
      ...data,
      permissions: [...shouldNotBeRemovedPermissions, ...newPermissions],
    };
  }

  return prisma.user.update({ where: { id }, data, select: userFields });
};
