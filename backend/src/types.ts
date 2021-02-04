import { Request } from 'express';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

export interface ExpressRequest extends Request {
  user?: UserWithoutPassword;
}

export interface ApolloExpressContext extends ExpressContext {
  req: ExpressRequest;
}
