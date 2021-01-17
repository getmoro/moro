import express from 'express';
import helmet from 'helmet';
import { getApolloServer } from '../graphql/graphqlServer';
import { apolloContext } from './apolloContext';
import bodyParser from 'body-parser';
import { initPassport } from './passport';

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

  // passport needs these two:
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  initPassport(app);

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
