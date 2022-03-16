/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';
import { ENTERED, ENTERING, EXITED, STAGGER } from '../constants';
import { useAnimator } from '../useAnimator';
import { Animator } from './Animator.component';

let actJestMoveTimeTo: ActJestMoveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  const jestMoveTimeTo = makeJestMoveTimeTo();
  actJestMoveTimeTo = makeActJestMoveTimeTo(jestMoveTimeTo);
});

afterEach(cleanup);

test('Should root node activate children nodes in "manager=stagger" with default "duration.stagger"', () => {
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
  let f4: any;
  const ExampleChild4: FC = () => {
    f4 = useAnimator()?.flow.value;
    return null;
  };

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

  actJestMoveTimeTo(1);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERING, EXITED, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(99);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERING, EXITED, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(101);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(124);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(126);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(149);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(151);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, EXITED]);

  actJestMoveTimeTo(174);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, EXITED]);

  actJestMoveTimeTo(176);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, ENTERING]);

  actJestMoveTimeTo(199);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, ENTERING]);

  actJestMoveTimeTo(201);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, ENTERING]);

  actJestMoveTimeTo(224);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, ENTERING]);

  actJestMoveTimeTo(226);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING, ENTERING]);

  actJestMoveTimeTo(249);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING, ENTERING]);

  actJestMoveTimeTo(251);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERING]);

  actJestMoveTimeTo(274);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERING]);

  actJestMoveTimeTo(276);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERED]);
});

test('Should root node activate children nodes in "manager=stagger" with items with "duration.offset" with custom "duration.stagger"', () => {
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
  let f4: any;
  const ExampleChild4: FC = () => {
    f4 = useAnimator()?.flow.value;
    return null;
  };

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

  actJestMoveTimeTo(1);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERING, EXITED, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(99);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERING, EXITED, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(101);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(119);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(121);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(139);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  // The child3 "duration.offset" takes place about here.

  actJestMoveTimeTo(141);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(189);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, EXITED, EXITED]);

  // Just before the "duration.offset" ends.

  actJestMoveTimeTo(191);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERING, ENTERING, ENTERING, EXITED]);

  actJestMoveTimeTo(201);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, EXITED]);

  actJestMoveTimeTo(209);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, EXITED]);

  actJestMoveTimeTo(211);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERING, ENTERING, ENTERING]);

  actJestMoveTimeTo(221);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERING, ENTERING]);

  actJestMoveTimeTo(291);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERING]);

  actJestMoveTimeTo(311);
  expect([f0, f1, f2, f3, f4]).toEqual([ENTERED, ENTERED, ENTERED, ENTERED, ENTERED]);
});
