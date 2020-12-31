import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import { getUserById } from "../user/getUserById";
import { getUserByCredentials } from "../user/getUserByCredentials";

passport.serializeUser((user: any, done) => {
  done(null, user.id as number);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await getUserById(id);

  if (user) {
    done(null, user);
  } else {
    done("User not found");
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await getUserByCredentials(username, password);

    if (!user) {
      return done(null, false, { message: "Incorrect credentials" });
    }
    return done(null, user);
  })
);

export const initPassport = (app: Express): void => {
  app.use(passport.initialize());
  app.use(passport.session());

  app.post("/login", passport.authenticate("local"), (req, res) =>
    res.sendStatus(200)
  );
};
