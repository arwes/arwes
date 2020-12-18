/* eslint-env jest */

function makeMoveTimeTo () {
  let currentTimeMoved = 0;

  return function moveTimeTo (timeToMove) {
    const timeOffset = timeToMove - currentTimeMoved;

    if (timeOffset <= 0) {
      throw new Error('Time to move must be greater than current time moved.');
    }

    currentTimeMoved = timeToMove;

    jest.advanceTimersByTime(timeOffset);
  };
}

export { makeMoveTimeTo };
