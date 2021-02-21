import { resolverHelper } from '../graphql/resolverHelper';
import { prisma } from '../server/prisma';
import { TOKEN_EXPIRE_MINUTES } from '../utils/constants';
import { createFakeToken } from './utils/createFakeToken';
import { hashUserPassword } from './hashUserPassword';
import { forgotPassword as forgotPasswordResolver } from './forgotPassword';
const forgotPassword = resolverHelper(forgotPasswordResolver);

describe('forgotPassword', () => {
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
    await prisma.token.deleteMany();
    await prisma.user.deleteMany();
  });

  it('Sends an email when a user asks for it', async () => {
    const result = await forgotPassword({ credentials: { email: user.email } });

    // check the tokens count
    const count = await prisma.token.count();
    expect(count).toEqual(1);

    expect(result?.success).toEqual(true);
    // spy on email function
    // email sent
  });

  it('returns success even if email is not valid but does not create a token', async () => {
    const result = await forgotPassword({ credentials: { email: 'not@areal.user' } });

    // check the tokens count
    const count = await prisma.token.count();
    expect(count).toEqual(0);

    expect(result?.success).toEqual(true);
    // spy on email function
    // email should not be sent
  });

  it('only sends one email if requests for one email address received in less than a minute', async () => {
    const result = await forgotPassword({ credentials: { email: user.email } });
    expect(result?.success).toEqual(true);

    // spy on email function
    // email sent

    const resultOnSecondTime = await forgotPassword({
      credentials: { email: user.email },
    });

    // check the tokens count
    const count = await prisma.token.count();
    expect(count).toEqual(1);

    expect(resultOnSecondTime?.success).toEqual(true);

    // spy on email function
    // email should not be sent
  });

  it('resends the same token if requests for one email address received in less than half of expiration time', async () => {
    // create a fake token request in DB with createdAt older than 1 minute but less than half TOKEN_EXPIRE_MINUTES
    await createFakeToken(user.email, false, 1.5);

    const result = await forgotPassword({ credentials: { email: user.email } });

    expect(result?.success).toEqual(true);
    // spy on email function
    // email sent

    // check the tokens count
    const count = await prisma.token.count();
    expect(count).toEqual(1);
  });

  it('returns false when the same email requests resetting password many times but have not used them during last day', async () => {
    await createFakeToken(user.email, false, TOKEN_EXPIRE_MINUTES * 3);
    await createFakeToken(user.email, false, TOKEN_EXPIRE_MINUTES * 2);
    await createFakeToken(user.email, false, TOKEN_EXPIRE_MINUTES);

    const result = await forgotPassword({ credentials: { email: user.email } });

    expect(result?.success).toEqual(false);
  });

  it('Sends an email when the same user requests resetting password many times, but used them', async () => {
    // these are used successfully
    await createFakeToken(user.email, true, TOKEN_EXPIRE_MINUTES * 3);
    await createFakeToken(user.email, true, TOKEN_EXPIRE_MINUTES * 2);
    // this one is not used
    await createFakeToken(user.email, false, TOKEN_EXPIRE_MINUTES);

    const result = await forgotPassword({ credentials: { email: user.email } });

    expect(result?.success).toEqual(true);
    // spy on email function
    // email sent
  });

  it('Sends an email when the same user requests resetting password many times but they are older than a day', async () => {
    await createFakeToken(user.email, false, 24 * 60 + 3);
    await createFakeToken(user.email, false, 24 * 60 + 2);
    await createFakeToken(user.email, false, 24 * 60 + 1);

    const result = await forgotPassword({ credentials: { email: user.email } });

    expect(result?.success).toEqual(true);
    // spy on email function
    // email sent
  });
});
