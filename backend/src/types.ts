import { Request } from 'express';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { User } from '@prisma/client';

export interface ExpressRequest extends Request {
  user?: Omit<User, 'password'>;
}

export interface ApolloExpressContext extends ExpressContext {
  req: ExpressRequest;
}
