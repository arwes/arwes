/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';
import { ENTERED, ENTERING, EXITED, SEQUENCE } from '../constants';
import { useAnimator } from '../useAnimator';
import { Animator } from './Animator.component';

let actJestMoveTimeTo: ActJestMoveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  const jestMoveTimeTo = makeJestMoveTimeTo();
  actJestMoveTimeTo = makeActJestMoveTimeTo(jestMoveTimeTo);
});

afterEach(cleanup);

test('Should root node activate children nodes in "manager=sequence"', () => {
  let f0: any;
  const ExampleParent: FC = () => {
    f0 = useAnimator()?.flow.value;
    return null;
  };
  let f1: any;
  const ExampleChild1: FC = () => {
    f1 = useAnimator()?.flow.value;
    return null;
  };
  let f2: any;
  const ExampleChild2: FC = () => {
    f2 = useAnimator()?.flow.value;
    return null;
  };
  let f3: any;
  const ExampleChild3: FC = () => {
    f3 = useAnimator()?.flow.value;
    return null;
  };

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

  actJestMoveTimeTo(1);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(99);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(101);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(199);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(201);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERING, EXITED]);

  actJestMoveTimeTo(299);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERING, EXITED]);

  actJestMoveTimeTo(301);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING]);

  actJestMoveTimeTo(399);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING]);

  actJestMoveTimeTo(401);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);
});

test('Should root node activate children nodes in "manager=sequence" with items custom "duration.offset"', () => {
  let f0: any;
  const ExampleParent: FC = () => {
    f0 = useAnimator()?.flow.value;
    return null;
  };
  let f1: any;
  const ExampleChild1: FC = () => {
    f1 = useAnimator()?.flow.value;
    return null;
  };
  let f2: any;
  const ExampleChild2: FC = () => {
    f2 = useAnimator()?.flow.value;
    return null;
  };
  let f3: any;
  const ExampleChild3: FC = () => {
    f3 = useAnimator()?.flow.value;
    return null;
  };

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

  actJestMoveTimeTo(1);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(99);
  expect([f0, f1, f2, f3]).toEqual([ENTERING, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(101);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(199);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERING, EXITED, EXITED]);

  // The child2 offset takes places about here.

  actJestMoveTimeTo(201);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, EXITED, EXITED]);

  actJestMoveTimeTo(249);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, EXITED, EXITED]);

  actJestMoveTimeTo(251);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERING, EXITED]);

  actJestMoveTimeTo(349);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERING, EXITED]);

  actJestMoveTimeTo(351);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING]);

  actJestMoveTimeTo(449);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING]);

  actJestMoveTimeTo(451);
  expect([f0, f1, f2, f3]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED]);
});
