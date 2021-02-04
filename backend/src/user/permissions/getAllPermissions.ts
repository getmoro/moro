import { QueryResolvers } from '../../graphql/resolvers-types';
import { allPermissions } from './allPermissions';

export const getAllPermissions: QueryResolvers['getAllPermissions'] = () =>
  allPermissions;
