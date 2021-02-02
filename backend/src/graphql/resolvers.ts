import { mergeResolvers } from '@graphql-tools/merge';
import userResolver from '../user/user.resolver';
import accessResolver from '../access/access.resolver';
import projectResolver from '../project/project.resolver';

export default mergeResolvers([userResolver, accessResolver, projectResolver]);
