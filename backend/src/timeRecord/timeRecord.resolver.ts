import { Resolvers } from '../graphql/resolvers-types';
import { getTimeRecords } from './getTimeRecords';
import { addTimeRecords } from './addTimeRecords';

const resolver: Resolvers = {
  Query: {
    timeRecords: getTimeRecords,
  },
  Mutation: {
    addTimeRecords,
  },
};

export default resolver;
