import express from "express";
import helmet from "helmet";
import { apolloServer } from "./graphql/graphqlServer";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

apolloServer.applyMiddleware({ app });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is up and running on ${port}`);
});
