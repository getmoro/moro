import bcrypt from 'bcrypt';
import { resolverHelper } from '../graphql/resolverHelper';
import { prisma } from '../server/prisma';
import { TOKEN_EXPIRE_MINUTES } from '../utils/constants';
import { resetPassword as resetPasswordResolver } from './resetPassword';
import { hashUserPassword } from './hashUserPassword';
import { createFakeToken } from './utils/createFakeToken';
const resetPassword = resolverHelper(resetPasswordResolver);

describe('resetPassword', () => {
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

  it("resets user's password when the token is fresh and valid", async () => {
    const tokenRow = await createFakeToken(user.email, false, 1);
    const password = 'newpassword';
    const result = await resetPassword({
      credentials: { token: tokenRow.token, password },
    });

    const userRow = await prisma.user.findUnique({ where: { email: user.email } });
    const passwordIsUpdated = await bcrypt.compare(password, userRow?.password || '');

    expect(result?.success).toEqual(true);
    expect(result?.token).toBeTruthy();
    expect(passwordIsUpdated).toEqual(true);
  });

  it("doesn't resets user's password when the token is old", async () => {
    const tokenRow = await createFakeToken(user.email, false, TOKEN_EXPIRE_MINUTES + 1);
    const password = 'newpassword';
    const result = await resetPassword({
      credentials: { token: tokenRow.token, password },
    });

    const userRow = await prisma.user.findUnique({ where: { email: user.email } });
    const passwordIsNotChanged = await bcrypt.compare(
      user.password,
      userRow?.password || '',
    );

    expect(result?.success).toEqual(false);
    expect(result?.token).toBeFalsy();
    expect(passwordIsNotChanged).toEqual(true);
  });

  it("doesn't resets user's password when the token is invalid", async () => {
    const token = 'NOT A VALID TOKEN';
    const password = 'newpassword';
    const result = await resetPassword({
      credentials: { token: token, password },
    });

    const userRow = await prisma.user.findUnique({ where: { email: user.email } });
    const passwordIsNotChanged = await bcrypt.compare(
      user.password,
      userRow?.password || '',
    );

    expect(result?.success).toEqual(false);
    expect(result?.token).toBeFalsy();
    expect(passwordIsNotChanged).toEqual(true);
  });

  it("doesn't allow reusing a token", async () => {
    const tokenRow = await createFakeToken(user.email, false, 1);
    const password = 'newpassword';
    const result = await resetPassword({
      credentials: { token: tokenRow.token, password },
    });

    const userRow = await prisma.user.findUnique({ where: { email: user.email } });
    const passwordIsUpdated = await bcrypt.compare(password, userRow?.password || '');

    const secondPassword = 'secondPassword';
    const secondResult = await resetPassword({
      credentials: { token: tokenRow.token, password: secondPassword },
    });

    const secondTimeUserRow = await prisma.user.findUnique({
      where: { email: user.email },
    });
    const passwordIsNotChanged = await bcrypt.compare(
      password,
      secondTimeUserRow?.password || '',
    );

    expect(result?.success).toEqual(true);
    expect(result?.token).toBeTruthy();
    expect(passwordIsUpdated).toEqual(true);

    expect(secondResult?.success).toEqual(false);
    expect(secondResult?.token).toBeFalsy();
    expect(passwordIsNotChanged).toEqual(true);
  });
});
