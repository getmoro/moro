import { getUser } from './getUser';
import { getUsers } from './getUsers';
import { createUser } from './createUser';
import { Resolvers } from '../graphql/resolvers-types';
import { register } from './register';
import { login } from './login';
import { forgotPassword } from './forgotPassword';
import { resetPassword } from './resetPassword';
import { validateSocialLogin } from './validateSocialLogin';
import { updateUser } from './updateUser';
import { getAllPermissions } from './permissions/getAllPermissions';

const resolver: Resolvers = {
  Query: {
    user: getUser,
    users: getUsers,
    getAllPermissions,
  },
  Mutation: {
    createUser,
    register,
    login,
    forgotPassword,
    resetPassword,
    validateSocialLogin,
    updateUser,
  },
};

export default resolver;
