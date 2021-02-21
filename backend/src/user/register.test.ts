import { resolverHelper } from '../graphql/resolverHelper';
import { prisma } from '../server/prisma';
import { register as registerResolver } from './register';
const register = resolverHelper(registerResolver);

describe('register', () => {
  const user = { email: 'test@test.test', name: 'Test', password: 'testtest' };
  afterEach(async () => {
    await prisma.user.deleteMany();
    await prisma.loginFailedAttempt.deleteMany();
  });

  it('registers a user correctly and creates a token', async () => {
    const result = await register({ user });
    expect(result?.success).toEqual(true);
    expect(result?.token).toBeTruthy();

    const userRow = await prisma.user.findUnique({ where: { email: user.email } });
    expect(userRow).toBeTruthy();
    expect(userRow?.email).toEqual(user.email);
    expect(userRow?.name).toEqual(user.name);
    // it should be hashed
    expect(userRow?.password === user.password).toBeFalsy();
  });

  it('does not register user with the same email', async () => {
    await register({ user });
    const result = await register({ user });

    expect(result?.success).toEqual(false);
    expect(result?.message).toEqual('This email is already registered');
  });
});
