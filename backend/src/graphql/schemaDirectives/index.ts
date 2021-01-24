import { SchemaDirectiveVisitor } from 'graphql-tools';
import {
  auth,
  hasPermissions,
  listLength,
  pattern,
  range,
  stringLength,
  selfNodeId,
  foreignNodeId,
} from '@profusion/apollo-validation-directives';

export const schemaDirectives = {
  auth,
  hasPermissions,
  listLength,
  pattern,
  range,
  stringLength,
  selfNodeId,
  foreignNodeId,
} as Record<string, typeof SchemaDirectiveVisitor>;

export const directiveTypes = [
  auth.getTypeDefs(),
  hasPermissions.getTypeDefs(),
  listLength.getTypeDefs(),
  pattern.getTypeDefs(),
  range.getTypeDefs(),
  stringLength.getTypeDefs(),
  selfNodeId.getTypeDefs(),
  foreignNodeId.getTypeDefs(),
];
