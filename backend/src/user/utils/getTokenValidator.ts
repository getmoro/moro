import fetch from 'node-fetch';
import { AuthServices } from '../../graphql/resolvers-types';
import {
  GoogleTokenInfoResponse,
  TokenValidator,
  UserContent,
  ValidateTokenByService,
} from '../types';

const googleTokenValidator: TokenValidator = (token) =>
  fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token)
    .then((res) => res.json())
    .then((decoded: GoogleTokenInfoResponse): UserContent | null => {
      // If token wasn't legit
      if ('error_description' in decoded) {
        return null;
      }

      // Google specific security checks
      if (
        (decoded.iss === 'accounts.google.com' ||
          decoded.iss === 'https://accounts.google.com') &&
        decoded.aud === process.env.GOOGLE_CLIENT_ID
      ) {
        // return our standard fields
        const { email, name } = decoded;
        return { email, name };
      }

      return null;
    });

const validateTokenByService: ValidateTokenByService = {
  GOOGLE: googleTokenValidator,
};

export const getTokenValidator = (service: AuthServices): TokenValidator | undefined =>
  validateTokenByService[service];
