import express from "express";
import helmet from "helmet";
import { apolloServer } from "./graphql/graphqlServer";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

apolloServer.applyMiddleware({ app });

app.listen(3000, () => {
  console.log("server is up and running");
});
