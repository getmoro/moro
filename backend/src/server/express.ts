import express from "express";
import helmet from "helmet";
import { getApolloServer } from "../graphql/graphqlServer";
import { apolloContext } from "./apolloContext";

export const startExpress = (): void => {
  const app = express();

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
