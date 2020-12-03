/* eslint-env jest */

import React, { useState, useEffect } from 'react';
import { render, act, cleanup } from '@testing-library/react';

import { EXITED, EXITING, ENTERED, ENTERING } from '../constants';
import { useAnimator } from '../useAnimator';
import { Component as Animator } from './Animator.component';

jest.useFakeTimers();
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

  act(() => jest.advanceTimersByTime(1));
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(498)); // 499ms
  expect(flow.value).toBe(EXITED);

  act(() => jest.advanceTimersByTime(2)); // 501ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(98)); // 599ms
  expect(flow.value).toBe(ENTERING);

  act(() => jest.advanceTimersByTime(2)); // 601ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(398)); // 999ms
  expect(flow.value).toBe(ENTERED);

  act(() => jest.advanceTimersByTime(2)); // 1001ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(98)); // 1099ms
  expect(flow.value).toBe(EXITING);

  act(() => jest.advanceTimersByTime(2)); // 1101ms
  expect(flow.value).toBe(EXITED);
});
