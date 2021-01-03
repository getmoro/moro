import express from "express";
import helmet from "helmet";
import { getApolloServer } from "../graphql/graphqlServer";
import { apolloContext } from "./apolloContext";
import bodyParser from "body-parser";
import { initPassport } from "./passport";

export const startExpress = (): void => {
  const app = express();

  // passport needs these two:
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  initPassport(app);

  // some level of http security
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === "production" ? undefined : false,
    })
  );

  // attach apollo server to express
  getApolloServer(apolloContext).applyMiddleware({ app });

  // start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`The server is up and running on ${port}`);
  });
};
