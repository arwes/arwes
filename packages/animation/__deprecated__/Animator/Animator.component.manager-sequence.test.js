/* eslint-env jest */

import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import { makeMoveTimeTo } from '../../test/makeMoveTimeTo';
import { ENTERED, ENTERING, EXITED, SEQUENCE } from '../constants';
import { useAnimator } from '../useAnimator';
import { Component as Animator } from './Animator.component';

let moveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  moveTimeTo = makeMoveTimeTo();
});

afterEach(cleanup);

test('Should root node activate children nodes in "manager=sequence"', () => {
  let f0;
  const ExampleParent = () => (f0 = useAnimator().flow.value) && null;
  let f1;
  const ExampleChild1 = () => (f1 = useAnimator().flow.value) && null;
  let f2;
  const ExampleChild2 = () => (f2 = useAnimator().flow.value) && null;
  let f3;
  const ExampleChild3 = () => (f3 = useAnimator().flow.value) && null;

  render(
    <Animator animator={{ manager: SEQUENCE }}>
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
    </Animator>
  );

  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(1));
  expect([f0, f1, f2, f3]).toEqual([ENTERING, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(99));
  expect([f0, f1, f2, f3]).toEqual([ENTERING, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(101));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERING, EXITED, EXITED]);

  act(() => moveTimeTo(199));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERING, EXITED, EXITED]);

  act(() => moveTimeTo(201));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERING, EXITED]);

  act(() => moveTimeTo(299));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERING, EXITED]);

  act(() => moveTimeTo(301));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING]);

  act(() => moveTimeTo(399));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING]);

  act(() => moveTimeTo(401));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);
});

test('Should root node activate children nodes in "manager=sequence" with items custom "duration.offset"', () => {
  let f0;
  const ExampleParent = () => (f0 = useAnimator().flow.value) && null;
  let f1;
  const ExampleChild1 = () => (f1 = useAnimator().flow.value) && null;
  let f2;
  const ExampleChild2 = () => (f2 = useAnimator().flow.value) && null;
  let f3;
  const ExampleChild3 = () => (f3 = useAnimator().flow.value) && null;

  render(
    <Animator animator={{ manager: SEQUENCE }}>
      <ExampleParent />
      <Animator>
        <ExampleChild1 />
        <Animator />
        <Animator />
      </Animator>
      <Animator animator={{ duration: { offset: 50 } }}>
        <ExampleChild2 />
      </Animator>
      <Animator>
        <ExampleChild3 />
        <Animator />
      </Animator>
    </Animator>
  );

  expect([f0, f1, f2, f3]).toEqual([EXITED, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(1));
  expect([f0, f1, f2, f3]).toEqual([ENTERING, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(99));
  expect([f0, f1, f2, f3]).toEqual([ENTERING, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(101));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERING, EXITED, EXITED]);

  act(() => moveTimeTo(199));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERING, EXITED, EXITED]);

  // The child2 offset takes places about here.

  act(() => moveTimeTo(201));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, EXITED, EXITED]);

  act(() => moveTimeTo(249));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, EXITED, EXITED]);

  act(() => moveTimeTo(251));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERING, EXITED]);

  act(() => moveTimeTo(349));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERING, EXITED]);

  act(() => moveTimeTo(351));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING]);

  act(() => moveTimeTo(449));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING]);

  act(() => moveTimeTo(451));
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);
});
