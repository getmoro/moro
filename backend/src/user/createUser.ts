import { MutationResolvers } from "../graphql/resolvers-types";

export const createUser: MutationResolvers["createUser"] = async (
  parent,
  args,
  ctx
) => {
  if (!args.user) throw new Error("Invalid Input");

  const result = await ctx.prisma.user.create({ data: args.user as any });
  console.log(result);

  return args.user as any;
};
