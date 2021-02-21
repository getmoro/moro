import { prisma } from '../server/prisma';
import { UserWithoutPassword } from '../types';
import { StitchingResolver } from './resolvers-types';

/*
 * This function provides a typesafe version of resolvers, that can be called from normal functions.
 * One use-case is in tests, when importing resolvers, wrapping it in this function helps
 * to skip passing all expected parameters and just passing the args. (second argument of resolvers)
 *
 * import { resolver as resolverR } from './resolver';
 * const resolver = resolverHelper(resolverR);
 * resolver({ params });
 */

type ResolverFn<TArgs, TResult> = (
  parent: any,
  args: TArgs,
  context: any,
  info: any,
) => TResult;

export function resolverHelper<TArgs, TResult>(
  resolver:
    | ResolverFn<TArgs, TResult>
    | StitchingResolver<TResult, any, any, TArgs>
    | undefined,
) {
  return (args: TArgs, user?: UserWithoutPassword): TResult =>
    (resolver as ResolverFn<TArgs, TResult>)({}, args, { prisma, user }, {});
}
