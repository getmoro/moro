import { resolverHelper } from '../graphql/resolverHelper';
import { AuthServices } from '../graphql/resolvers-types';
import { prisma } from '../server/prisma';
import { validateSocialLogin as validateSocialLoginResolver } from './validateSocialLogin';
const validateSocialLogin = resolverHelper(validateSocialLoginResolver);
jest.mock('./utils/getTokenValidator');

describe('validateSocialLogin', () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('validates a correct login from a third party and returns a token', async () => {
    const result = await validateSocialLogin({
      credentials: { service: AuthServices.Google, token: 'OK' },
    });

    expect(result?.success).toEqual(true);
    expect(result?.token).toBeTruthy();
  });

  it('does not validates a wrong login from a third party', async () => {
    const result = await validateSocialLogin({
      credentials: { service: AuthServices.Google, token: 'BAD' },
    });

    expect(result?.success).toEqual(false);
  });
});
