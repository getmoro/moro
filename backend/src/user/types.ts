import { User } from '@prisma/client';
import { AuthServices } from '../graphql/resolvers-types';

export type UserContent = Pick<User, 'email' | 'name'>;

type GoogleClientId = string;
export type GoogleJWTDecoded = {
  iss: string;
  azp: GoogleClientId;
  aud: GoogleClientId;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
};
export type GoogleJWTError = {
  error_description: string;
};
export type GoogleTokenInfoResponse = GoogleJWTDecoded | GoogleJWTError;

export type TokenValidator = (token: string) => Promise<UserContent | null>;
export type ValidateTokenByService = Partial<Record<AuthServices, TokenValidator>>;
