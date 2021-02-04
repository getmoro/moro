import { resolverHelper } from '../graphql/resolverHelper';
import { prisma } from '../server/prisma';
import { UserWithoutPassword } from '../types';
import { hashUserPassword } from './hashUserPassword';
import { allPermissions } from './permissions/allPermissions';
import { updateUser as updateUserResolver } from './updateUser';
import { userFields } from './utils/constants';
const updateUser = resolverHelper(updateUserResolver);

describe('updateUser', () => {
  const user = {
    email: 'test@test.test',
    name: 'Test',
    password: 'testtest',
    permissions: [],
  };
  const adminUser = { ...user, id: -1, permissions: allPermissions };

  const makeUser = async (permissions: string[] = []): Promise<UserWithoutPassword> => {
    const normalUser = await hashUserPassword(user);
    return prisma.user.create({
      data: { ...normalUser, permissions },
      select: userFields,
    });
  };

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('updates user correctly', async () => {
    const normalUser = await makeUser();
    const updateValues = {
      id: normalUser.id,
      name: 'Changed',
      email: 'changed@test.test',
      permissions: [allPermissions[0]],
    };
    const result = await updateUser({ user: updateValues }, adminUser);
    expect(result).toEqual(updateValues);
  });

  it('updates user correctly when only some fields are requested for updating', async () => {
    const normalUser = await makeUser();
    const updateValues = {
      id: normalUser.id,
      name: 'Changed',
    };
    const result = await updateUser({ user: updateValues }, adminUser);
    expect(result).toEqual({ ...normalUser, ...updateValues });
  });

  it('updates user permissions only if admin has those access herself', async () => {
    const normalUser = await makeUser([allPermissions[0]]);
    const updateValues = {
      id: normalUser.id,
      permissions: [allPermissions[1], allPermissions[2]],
    };
    const result = await updateUser(
      { user: updateValues },
      { ...adminUser, permissions: [allPermissions[1]] },
    );
    expect(result).toEqual({
      ...normalUser,
      permissions: [allPermissions[0], allPermissions[1]],
    });
  });

  it('does not updates user if it does not exist', async () => {
    const result = await updateUser({ user: { ...user, id: -1 } });

    expect(result).toEqual({});
  });

  it('does not updates user if it is same as admin', async () => {
    const normalUser = await makeUser();
    const updateValues = {
      id: normalUser.id,
      name: 'Changed',
    };
    const result = await updateUser({ user: updateValues }, normalUser);

    expect(result).toEqual({});
  });

  it('does not updates user password', async () => {
    const normalUser = await makeUser();
    const updateValues = {
      id: normalUser.id,
      password: 'Changed',
    };
    const result = await updateUser({ user: updateValues }, adminUser);
    expect(result).toEqual(normalUser);
  });
});
