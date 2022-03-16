/* eslint-env jest */
/* istanbul ignore file */

import { act } from '@testing-library/react';

import { JestMoveTimeTo } from './makeJestMoveTimeTo';

type ActJestMoveTimeTo = (timeToMove: number) => void;

function makeActJestMoveTimeTo (jestMoveTimeTo: JestMoveTimeTo): ActJestMoveTimeTo {
  function actJestMoveTimeTo (timeToMove: number): void {
    act(() => {
      jestMoveTimeTo(timeToMove);
    });
  }

  return actJestMoveTimeTo;
}

export { ActJestMoveTimeTo, makeActJestMoveTimeTo };
