/* eslint-env jest */
/* istanbul ignore file */

type JestMoveTimeTo = (timeToMove: number) => void;

function makeJestMoveTimeTo (): JestMoveTimeTo {
  let currentTimeMoved = 0;

  function jestMoveTimeTo (timeToMove: number): void {
    const timeOffset = timeToMove - currentTimeMoved;

    if (timeOffset <= 0) {
      throw new Error('Time to move must be greater than current time moved.');
    }

    currentTimeMoved = timeToMove;

    jest.advanceTimersByTime(timeOffset);
  };

  return jestMoveTimeTo;
}

export { JestMoveTimeTo, makeJestMoveTimeTo };
