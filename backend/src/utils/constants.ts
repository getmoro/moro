export const JWT_SECRET = process.env.JWT_SECRET || 'JWT_DARK_SECRET';
export const JWT_ALGORITHM = 'HS256';
export const TOKEN_EXPIRE_MINUTES = 10;
export enum ATTEMPT_TYPES {
  'LOGIN',
  'RESET_PASSWORD',
}
