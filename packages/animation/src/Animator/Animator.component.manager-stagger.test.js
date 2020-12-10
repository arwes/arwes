/* eslint-env jest */

import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import { makeMoveTimeTo } from '../../test/makeMoveTimeTo';
import { ENTERED, ENTERING, EXITED, STAGGER } from '../constants';
import { useAnimator } from '../useAnimator';
import { Component as Animator } from './Animator.component';

let moveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  moveTimeTo = makeMoveTimeTo();
});

afterEach(cleanup);

test('Should root node activate children nodes in "manager=stagger" with default "duration.stagger"', () => {
  let f0;
  const ExampleParent = () => (f0 = useAnimator().flow.value) && null;
  let f1;
  const ExampleChild1 = () => (f1 = useAnimator().flow.value) && null;
  let f2;
  const ExampleChild2 = () => (f2 = useAnimator().flow.value) && null;
  let f3;
  const ExampleChild3 = () => (f3 = useAnimator().flow.value) && null;
  let f4;
  const ExampleChild4 = () => (f4 = useAnimator().flow.value) && null;

  render(
    <Animator animator={{ manager: STAGGER }}>
      <ExampleParent />
      <Animator>
        <ExampleChild1 />
        <Animator />
        <Animator />
      </Animator>
      <Animator>
        <ExampleChild2 />
      </Animator>
      <Animator>
        <ExampleChild3 />
        <Animator />
      </Animator>
      <Animator>
        <ExampleChild4 />
      </Animator>
    </Animator>
  );

  // The selected times to test are just before and just after any of the nodes
  // transition flow state until all of them are ENTERED.

  expect([f0, f1, f2, f3, f4]).toEqual([EXITED, EXITED, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(1));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERING, EXITED, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(99));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERING, EXITED, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(101));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(124));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(126));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  act(() => moveTimeTo(149));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  act(() => moveTimeTo(151));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, EXITED]);

  act(() => moveTimeTo(174));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, EXITED]);

  act(() => moveTimeTo(176));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, ENTERING]);

  act(() => moveTimeTo(199));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, ENTERING]);

  act(() => moveTimeTo(201));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, ENTERING]);

  act(() => moveTimeTo(224));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, ENTERING]);

  act(() => moveTimeTo(226));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING, ENTERING]);

  act(() => moveTimeTo(249));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING, ENTERING]);

  act(() => moveTimeTo(251));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERING]);

  act(() => moveTimeTo(274));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERING]);

  act(() => moveTimeTo(276));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERED]);
});

test.todo('Should invisible root node activate children nodes in "manager=stagger"');
