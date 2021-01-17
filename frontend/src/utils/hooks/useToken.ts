import { TOKEN } from '../constants';
import { useRememberMe } from './useRememberMe';

export type TokenType = string | null;
type SetToken = (token: TokenType) => void;
// typescript (or some other related package) has a bug that can't parse the array correctly, so we ended up with this bad type
type UseToken = () => Array<any>;

export const useToken: UseToken = () => {
  const [remember] = useRememberMe();
  const storage = remember ? localStorage : sessionStorage;
  const token = storage.getItem(TOKEN);
  const setToken: SetToken = (newToken) => {
    if (newToken) {
      storage.setItem(TOKEN, newToken);
    } else {
      storage.removeItem(TOKEN);
    }
  };
  return [token, setToken];
};
