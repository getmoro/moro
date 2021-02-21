import { getRememberMe } from './rememberMe';

export const TOKEN = 'token';
export type TokenType = string | null;

/*
 * Get and set the value of the JWT token we receive from the backend. It's needed for the authentication.
 */

export const getToken = (): TokenType =>
  getRememberMe() ? localStorage.getItem(TOKEN) : sessionStorage.getItem(TOKEN);

export const setToken = (token: string): void => {
  getRememberMe()
    ? localStorage.setItem(TOKEN, token)
    : sessionStorage.setItem(TOKEN, token);
};
