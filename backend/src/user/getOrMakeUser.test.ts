import { prisma } from '../server/prisma';
import { getOrMakeUser } from './getOrMakeUser';

describe('getOrMakeUser', () => {
  const user = { email: 'test@test.test', name: 'Test' };
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('makes a user correctly', async () => {
    const result = await getOrMakeUser(user);
    const userRow = await prisma.user.findUnique({ where: { email: user.email } });
    expect(result).toEqual(userRow);
  });

  it('gets user correctly', async () => {
    // first time make the user
    const createdResult = await getOrMakeUser(user);
    const userRow = await prisma.user.findUnique({ where: { email: user.email } });
    expect(createdResult).toEqual(userRow);

    // now it should just get the user
    const result = await getOrMakeUser(user);
    expect(result).toEqual(userRow);
  });
});
