import { TokenValidator } from '../../types';

export const getTokenValidator = (): TokenValidator => (token) =>
  Promise.resolve(token === 'OK' ? { email: 'test@test.test', name: 'Test' } : null);
