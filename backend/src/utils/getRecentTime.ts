export const getRecentTime = (min: number): Date => {
  const now = new Date();
  return new Date(now.getTime() - min * 60000);
};
