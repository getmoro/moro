import { getRecentTime } from './getRecentTime';
import { isReachedLimit } from './isReachedLimit';

describe('isReachedLimit', () => {
  it('returns false when limits and dates are empty', () => {
    expect(isReachedLimit([], [])).toEqual(false);
  });

  it('returns false when limits are empty', () => {
    expect(isReachedLimit([], [new Date()])).toEqual(false);
  });

  it('returns false when dates are empty', () => {
    expect(isReachedLimit([{ period: 1, count: 1 }], [])).toEqual(false);
  });

  it('returns false when no limit is reached', () => {
    expect(
      isReachedLimit([{ period: 10, count: 3 }], [getRecentTime(1), getRecentTime(1)]),
    ).toEqual(false);

    expect(
      isReachedLimit(
        [
          { period: 10, count: 3 },
          { period: 20, count: 20 },
        ],
        [getRecentTime(1), getRecentTime(1)],
      ),
    ).toEqual(false);
  });

  it('returns true when even one limit is reached', () => {
    expect(
      isReachedLimit([{ period: 10, count: 2 }], [getRecentTime(1), getRecentTime(1)]),
    ).toEqual(true);

    expect(
      isReachedLimit(
        [
          { period: 5, count: 5 },
          { period: 2, count: 2 },
        ],
        [getRecentTime(1), getRecentTime(1)],
      ),
    ).toEqual(true);

    expect(
      isReachedLimit(
        [
          { period: 5, count: 2 },
          { period: 2, count: 1 },
        ],
        [getRecentTime(1), getRecentTime(1)],
      ),
    ).toEqual(true);
  });
});
