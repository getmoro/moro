import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { User as PublicUser } from '../graphql/resolvers-types';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_DARK_SECRET';

export const createTokenFromUser = (user: User): string => {
  const body: PublicUser = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  return jwt.sign({ user: body }, JWT_SECRET);
};
