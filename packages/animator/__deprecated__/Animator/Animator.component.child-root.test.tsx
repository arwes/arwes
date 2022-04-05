/* eslint-env jest */

import React, { FC, useState, useEffect } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';
import { EXITED, EXITING, ENTERED, ENTERING } from '../constants';
import { useAnimator } from '../useAnimator';
import { Animator } from './Animator.component';

let actJestMoveTimeTo: ActJestMoveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  const jestMoveTimeTo = makeJestMoveTimeTo();
  actJestMoveTimeTo = makeActJestMoveTimeTo(jestMoveTimeTo);
});

afterEach(cleanup);

test('Should transition on "activate" changes', () => {
  let flow: any;
  const ExampleChild: FC = () => {
    flow = useAnimator()?.flow;
    return null;
  };

  const ExampleApp: FC = () => {
    const [activate, setActivate] = useState(false);
    useEffect(() => {
      setTimeout(() => setActivate(true), 500);
      setTimeout(() => setActivate(false), 1000);
    }, []);
    return (
      <Animator>
        <Animator animator={{ root: true, activate }}>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  };

  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(1);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(499);
  expect(flow.value).toBe(EXITED);

  actJestMoveTimeTo(501);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(599);
  expect(flow.value).toBe(ENTERING);

  actJestMoveTimeTo(601);
  expect(flow.value).toBe(ENTERED);

  actJestMoveTimeTo(999);
  expect(flow.value).toBe(ENTERED);

  actJestMoveTimeTo(1001);
  expect(flow.value).toBe(EXITING);

  actJestMoveTimeTo(1099);
  expect(flow.value).toBe(EXITING);

  actJestMoveTimeTo(1101);
  expect(flow.value).toBe(EXITED);
});
