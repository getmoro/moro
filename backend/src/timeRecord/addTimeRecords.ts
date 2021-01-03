import { MutationResolvers } from 'src/graphql/resolvers-types';

export const addTimeRecords: MutationResolvers['addTimeRecords'] = async (
  parent,
  args,
  { prisma },
) => {
  const inserts = args.timeRecords.map((record) => {
    const data = {
      date: record.date,
      start: record.start,
      end: record.end,
      breakDuration: record.breakDuration,
      user: {
        connect: {
          id: 1,
        },
      },
    };

    return prisma.timeRecord.create({ data });
  });
  try {
    await Promise.all(inserts);
    return true;
  } catch (error) {
    console.log('There was an error while adding time records to db', error);
    return false;
  }
};
