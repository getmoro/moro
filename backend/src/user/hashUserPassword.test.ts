import bcrypt from 'bcrypt';
import { hashUserPassword } from './hashUserPassword';

describe('hashUserPassword', () => {
  it('applies hash on user password', async () => {
    const password = '123';
    const hashedPasswordObj = await hashUserPassword({ password });

    const result = await bcrypt.compare(password, hashedPasswordObj.password);
    expect(result).toEqual(true);
  });

  it("doesn't change data when it doesn't have password field", async () => {
    const user: { email: string; password?: string } = { email: 'test@test.test' };
    const sameUser = await hashUserPassword(user);

    expect(sameUser).toEqual(user);
  });
});
