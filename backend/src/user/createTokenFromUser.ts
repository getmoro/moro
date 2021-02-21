import jwt from 'jsonwebtoken';
import { User as PublicUser } from '../graphql/resolvers-types';
import { JWT_SECRET, JWT_ALGORITHM } from '../utils/constants';

export const createTokenFromUser = <T extends PublicUser>(user: T): string => {
  const body: PublicUser = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  return jwt.sign(body, JWT_SECRET, { algorithm: JWT_ALGORITHM });
};
