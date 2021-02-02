import { Resolvers } from '../graphql/resolvers-types';
import { getAccessList } from './getAccessList';

const resolver: Resolvers = {
  Query: {
    getAccessList,
  },
};

export default resolver;
