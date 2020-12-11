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

  // There are grandchildren nodes just to test it still works as expected.

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

test('Should root node activate children nodes in "manager=stagger" with items with "duration.offset" with custom "duration.stagger"', () => {
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

  // There are grandchildren nodes just to test it still works as expected.

  render(
    <Animator animator={{ duration: { stagger: 20 }, manager: STAGGER }}>
      <ExampleParent />
      <Animator>
        <ExampleChild1 />
        <Animator />
        <Animator />
      </Animator>
      <Animator>
        <ExampleChild2 />
      </Animator>
      <Animator animator={{ duration: { offset: 50 } }}>
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

  act(() => moveTimeTo(119));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, EXITED, EXITED, EXITED]);

  act(() => moveTimeTo(121));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  act(() => moveTimeTo(139));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  // The child3 "duration.offset" takes place about here.

  act(() => moveTimeTo(141));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  act(() => moveTimeTo(189));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  // Just before the "duration.offset" ends.

  act(() => moveTimeTo(191));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, EXITED]);

  act(() => moveTimeTo(201));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, EXITED]);

  act(() => moveTimeTo(209));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, EXITED]);

  act(() => moveTimeTo(211));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, ENTERING]);

  act(() => moveTimeTo(221));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING, ENTERING]);

  act(() => moveTimeTo(291));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERING]);

  act(() => moveTimeTo(311));
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERED]);
});
