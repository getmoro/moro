export const getUsers = async (_: any, { id }: any, ctx: any): Promise<any> => {
  const allUsers = await ctx.prisma.user.findMany({});

  return allUsers;
};
