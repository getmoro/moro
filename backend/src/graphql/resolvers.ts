import { mergeResolvers } from '@graphql-tools/merge';
import userResolver from '../user/user.resolver';
import projectResolver from '../project/project.resolver';

export default mergeResolvers([userResolver, projectResolver]);
