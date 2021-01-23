import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { User as PublicUser } from '../graphql/resolvers-types';
import { JWT_SECRET } from '../utils/constants';

export const createTokenFromUser = (user: User): string => {
  const body: PublicUser = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  return jwt.sign(body, JWT_SECRET);
};
