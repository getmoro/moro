import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { directiveTypes } from './schemaDirectives';

const typesArray = loadFilesSync(path.join(__dirname, '..'), {
  extensions: ['gql'],
});

export default mergeTypeDefs([...typesArray, ...directiveTypes]);
