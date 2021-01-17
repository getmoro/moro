import { getUser } from './getUser';
import { getUsers } from './getUsers';
import { createUser } from './createUser';
import { Resolvers } from '../graphql/resolvers-types';
import { register } from './register';

const resolver: Resolvers = {
  Query: {
    user: getUser,
    users: getUsers,
  },
  Mutation: {
    createUser,
    register,
  },
};

export default resolver;
