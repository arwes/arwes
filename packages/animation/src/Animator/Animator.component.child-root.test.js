/* eslint-env jest */

import React, { useState, useEffect } from 'react';
import { render, act, cleanup } from '@testing-library/react';

import { makeMoveTimeTo } from '../../test/makeMoveTimeTo';
import { EXITED, EXITING, ENTERED, ENTERING } from '../constants';
import { useAnimator } from '../useAnimator';
import { Component as Animator } from './Animator.component';

let moveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  moveTimeTo = makeMoveTimeTo();
});

afterEach(cleanup);

test('Should transition on "activate" changes', () => {
  let flow;
  function ExampleChild () {
    flow = useAnimator().flow;
    return null;
  }

  function ExampleApp () {
    const [activate, setActivate] = useState(false);
    useEffect(() => setTimeout(() => setActivate(true), 500), []);
    useEffect(() => setTimeout(() => setActivate(false), 1000), []);
    return (
      <Animator>
        <Animator animator={{ root: true, activate }}>
          <ExampleChild />
        </Animator>
      </Animator>
    );
  }

  render(<ExampleApp />);

  expect(flow.value).toBe(EXITED);

  act(() => moveTimeTo(1));
  expect(flow.value).toBe(EXITED);

  act(() => moveTimeTo(499));
  expect(flow.value).toBe(EXITED);

  act(() => moveTimeTo(501));
  expect(flow.value).toBe(ENTERING);

  act(() => moveTimeTo(599));
  expect(flow.value).toBe(ENTERING);

  act(() => moveTimeTo(601));
  expect(flow.value).toBe(ENTERED);

  act(() => moveTimeTo(999));
  expect(flow.value).toBe(ENTERED);

  act(() => moveTimeTo(1001));
  expect(flow.value).toBe(EXITING);

  act(() => moveTimeTo(1099));
  expect(flow.value).toBe(EXITING);

  act(() => moveTimeTo(1101));
  expect(flow.value).toBe(EXITED);
});
