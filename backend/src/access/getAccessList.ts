import { QueryResolvers } from '../graphql/resolvers-types';
import { accessList } from './accessList';

export const getAccessList: QueryResolvers['getAccessList'] = () => accessList;
