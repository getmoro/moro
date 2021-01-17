import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { Express, RequestHandler } from 'express';
import { getUserByCredentials } from '../user/getUserByCredentials';
import { User } from '../graphql/resolvers-types';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_DARK_SECRET';
const AUTH = {
  login: 'login',
  jwt: 'jwt',
};

passport.use(
  AUTH.login,
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await getUserByCredentials({ email, password });

      if (!user) {
        return done(null, false, { message: 'Incorrect credentials' });
      }
      return done(null, user);
    },
  ),
);

passport.use(
  AUTH.jwt,
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
    },
  ),
);

const addUserToAllRequests: RequestHandler = (req, res, next) => {
  passport.authenticate(AUTH.jwt, { session: false }, (err, user: User) => {
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);
};

export const initPassport = (app: Express): void => {
  app.use(passport.initialize());
  app.use(addUserToAllRequests);

  app.post('/login', async (req, res, next) => {
    passport.authenticate(AUTH.login, async (err, user, info) => {
      try {
        if (err || !user) {
          const message = info.message ? info.message : 'An error occurred';
          return res.json({ success: false, message });
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body: User = {
            id: user.id,
            email: user.email,
            name: user.name,
          };
          const token = jwt.sign({ user: body }, JWT_SECRET);

          return res.json({ success: true, token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
};
