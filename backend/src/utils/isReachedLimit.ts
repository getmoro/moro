import { getRecentTime } from './getRecentTime';

export type Limit = { period: number; count: number };

/*
 * This function compares a list of dates with a list of limits and even if one of the limits reached it will return true
 * Useful to limit user on certain tasks, such as login failures.
 */

export const isReachedLimit = (limits: Limit[], dates: Date[]): boolean =>
  limits
    .map(({ period, count }) => {
      const dateToCompare = getRecentTime(period);
      const found = dates.reduce(
        (found, date) => (date >= dateToCompare ? found + 1 : found),
        0,
      );

      return found >= count;
    })
    .some((reached: boolean) => reached);
