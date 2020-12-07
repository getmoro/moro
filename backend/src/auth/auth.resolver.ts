const resolver = {
  Query: {
    user: (req: any, res: any, ctx: any) => ctx.user,
  },
};

export default resolver;
