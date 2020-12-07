import { Request } from "express";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

export interface ExpressRequest extends Request {
  user: any;
}

export interface ApolloContext extends ExpressContext {
  req: ExpressRequest;
}
