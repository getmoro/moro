import { prisma } from '../server/prisma';
import { resolverHelper } from '../graphql/resolverHelper';
import { hashUserPassword } from './hashUserPassword';
import { login as loginResolver } from './login';
const login = resolverHelper(loginResolver);

describe('login', () => {
  const user = { email: 'test@test.test', name: 'Test', password: 'testtest' };
  beforeEach(async () => {
    // make user to test
    const data = await hashUserPassword(user);
    await prisma.user.create({ data });

    // make another test user, just to be sure nothing is mixed up
    const anotherUser = {
      email: 'anothertest@test.test',
      name: 'Some Test',
      password: 'tsetest',
    };
    const anotherData = await hashUserPassword(anotherUser);
    await prisma.user.create({ data: anotherData });
  });
  afterEach(async () => {
    await prisma.user.deleteMany();
    await prisma.loginFailedAttempt.deleteMany();
  });

  it('returns successful result and a token when right credentials used', async () => {
    const result = await login({
      credentials: { email: 'test@test.test', password: 'testtest' },
    });

    expect(result?.success).toEqual(true);
    expect(result?.token).toBeTruthy();
  });

  it('returns failed result without token when bad credentials used', async () => {
    const result = await login({
      credentials: { email: 'test@test.test', password: 'testbad' },
    });

    expect(result?.success).toEqual(false);
    expect(result?.token).toBeFalsy();
  });

  it('does not allow login even with right credentials if login failed too many times', async () => {
    const credentials = { email: 'test@test.test', password: 'testbad' };
    // bad credentials
    await login({ credentials });
    await login({ credentials });
    await login({ credentials });
    await login({ credentials });
    await login({ credentials });
    // right credentials
    const result = await login({ credentials: { ...credentials, password: 'testtest' } });
    expect(result?.success).toEqual(false);
  });

  it('allows login attempts, after a successful login even after a couple of login failures', async () => {
    const credentials = { email: 'test@test.test', password: 'testbad' };
    // bad credentials
    await login({ credentials });
    await login({ credentials });
    await login({ credentials });
    // right credentials
    await login({ credentials: { ...credentials, password: 'testtest' } });
    // again some bad credentials
    await login({ credentials });
    await login({ credentials });
    await login({ credentials });

    // login is just fine, eventhough total failures where above the threshold
    const result = await login({ credentials: { ...credentials, password: 'testtest' } });
    expect(result?.success).toEqual(true);
  });
});
