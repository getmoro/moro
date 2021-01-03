import { QueryResolvers } from 'src/graphql/resolvers-types';

export const getTimeRecords: QueryResolvers['timeRecords'] = (
  parent,
  args,
  { prisma },
) => {
  return prisma.timeRecord.findMany({ where: { userId: 1 } });
};
