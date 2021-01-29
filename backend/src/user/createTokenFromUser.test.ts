import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';
import { createTokenFromUser } from './createTokenFromUser';

describe('createTokenFromUser', () => {
  it('creates token correctly', () => {
    const token = createTokenFromUser({
      id: 1,
      email: 'test@test.test',
      name: 'Test',
    });

    const tokenDecryptedKeys = Object.keys(jwt.verify(token, JWT_SECRET)).sort();

    expect(tokenDecryptedKeys).toEqual(['email', 'iat', 'id', 'name']);
  });

  it('does not include extra fields', () => {
    const token = createTokenFromUser({
      id: 1,
      email: 'test@test.test',
      name: 'Test',
      password: '123456',
    });

    const tokenDecryptedKeys = Object.keys(jwt.verify(token, JWT_SECRET)).sort();

    expect(tokenDecryptedKeys).toEqual(['email', 'iat', 'id', 'name']);
  });
});
