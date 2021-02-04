import { difference } from 'lodash';
import { UserWithoutPassword } from '../../types';
import { isDevEnv } from '../../utils/isDevEnv';

export const checkMissingPermissions = (user: UserWithoutPassword | undefined) => (
  neededPermissions: string[],
): string[] => {
  if (!user) return neededPermissions;

  // exceptionally skip permission check if it's a development environment
  if (isDevEnv()) return [];

  return difference(neededPermissions, user.permissions);
};
