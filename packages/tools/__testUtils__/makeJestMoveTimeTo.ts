/* eslint-env jest */
/* istanbul ignore file */

type JestMoveTimeTo = (timeToMoveSeconds: number) => void;

function makeJestMoveTimeTo (): JestMoveTimeTo {
  let currentTimeMoved = 0;

  function jestMoveTimeTo (timeToMoveSeconds: number): void {
    const timeToMoveMs = timeToMoveSeconds * 1000;
    const timeOffset = timeToMoveMs - currentTimeMoved;

    if (timeOffset <= 0) {
      throw new Error('Time to move must be greater than current time moved.');
    }

    currentTimeMoved = timeToMoveMs;

    jest.advanceTimersByTime(timeOffset);
  };

  return jestMoveTimeTo;
}

export type { JestMoveTimeTo };
export { makeJestMoveTimeTo };
