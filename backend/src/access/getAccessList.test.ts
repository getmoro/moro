import { resolverHelper } from '../graphql/resolverHelper';
import { accessList } from './accessList';
import { getAccessList as getAccessListResolver } from './getAccessList';
const getAccessList = resolverHelper(getAccessListResolver);

describe('getAccessList', () => {
  it('returns all access list', () => {
    expect(getAccessList({})).toEqual(accessList);
  });
});
