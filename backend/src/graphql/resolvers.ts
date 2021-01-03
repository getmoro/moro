import { mergeResolvers } from '@graphql-tools/merge';
import userResolver from '../user/user.resolver';
import timeRecordResolver from '../timeRecord/timeRecord.resolver';

export default mergeResolvers([userResolver, timeRecordResolver]);
