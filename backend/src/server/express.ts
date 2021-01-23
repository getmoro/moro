import express from 'express';
import helmet from 'helmet';
import expressJwt from 'express-jwt';
import { getApolloServer } from '../graphql/graphqlServer';
import { apolloContext } from './apolloContext';
import { JWT_SECRET } from '../utils/constants';

export const startExpress = (): void => {
  const app = express();

  // allow local frontend to send requests
  if (process.env.ALLOW_ORIGIN || process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
      );
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  // Extract user from JWT (Authorization header Bearer) as user in all requests
  app.use(expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] }));

  // some level of http security
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  // attach apollo server to express
  getApolloServer(apolloContext).applyMiddleware({ app });

  // start the server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`The server is up and running on ${port}`);
  });
};
