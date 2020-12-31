import express from "express";
import helmet from "helmet";
import { getApolloServer } from "../graphql/graphqlServer";
import { apolloContext } from "./apolloContext";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { initPassport } from "./passport";

export const startExpress = (): void => {
  const app = express();

  /*
   * HACK: To make graphql playground work
   * use /api/login and copy the received cookie to graphql playground headers section (bottom left), like:
   * { cookiegraphql: "paste here" }
   */
  app.all("*", (req, res, next) => {
    if (
      req.headers.cookiegraphql &&
      typeof req.headers.cookiegraphql === "string"
    )
      req.headers.cookie = req.headers.cookiegraphql;

    next();
  });

  // passport needs these four:
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "EXPRESS_SESSION_SECRET",
      resave: true,
      saveUninitialized: true,
    })
  );
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
