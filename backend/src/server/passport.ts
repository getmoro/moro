import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import jwt from "jsonwebtoken";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { getUserByCredentials } from "../user/getUserByCredentials";
import { User } from "src/graphql/resolvers-types";

const JWT_SECRET = process.env.JWT_SECRET || "JWT_DARK_SECRET";

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    const user = await getUserByCredentials(username, password);

    if (!user) {
      return done(null, false, { message: "Incorrect credentials" });
    }
    return done(null, user);
  })
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export const initPassport = (app: Express): void => {
  app.use(passport.initialize());
  app.use((req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user: User) => {
      if (user) {
        req.user = user;
      }

      next();
    })(req, res, next);
  });

  app.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error("An error occurred.");

          return next(error);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
          };
          const token = jwt.sign({ user: body }, JWT_SECRET);

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
};
