import { Resolvers } from '../graphql/resolvers-types';
import { getProjects } from './getProjects';

const resolver: Resolvers = {
  Query: {
    projects: getProjects,
  },
};

export default resolver;
