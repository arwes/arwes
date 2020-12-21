/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeJestMoveTimeTo } from '../../test-utils/makeJestMoveTimeTo';
import { ActJestMoveTimeTo, makeActJestMoveTimeTo } from '../../test-utils/makeActJestMoveTimeTo';
import { ENTERED, ENTERING, EXITED, AnimatorSettingsManagerCustom } from '../constants';
import { useAnimator } from '../useAnimator';
import { Animator } from './Animator.component';

let actJestMoveTimeTo: ActJestMoveTimeTo;

jest.useFakeTimers();

beforeEach(() => {
  const jestMoveTimeTo = makeJestMoveTimeTo();
  actJestMoveTimeTo = makeActJestMoveTimeTo(jestMoveTimeTo);
});

afterEach(cleanup);

test('Should root node activate non-merge children nodes in "manager" custom', () => {
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

  const manager: AnimatorSettingsManagerCustom = ({ nodes, duration }) => {
    const times = nodes.map(node => ({ node, time: duration.stagger }));
    return { times };
  };
  render(
    <Animator animator={{ manager, duration: { stagger: 500 } }}>
      <ExampleParent />
      <Animator>
        <ExampleChild1 />
      </Animator>
      <Animator>
        <ExampleChild2 />
      </Animator>
    </Animator>
  );

  // The selected times to test are just before and just after any of the nodes
  // transition flow state until all of them are ENTERED.

  expect([f0, f1, f2]).toEqual([EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(1);
  expect([f0, f1, f2]).toEqual([ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(99);
  expect([f0, f1, f2]).toEqual([ENTERING, EXITED, EXITED]);

  // Parent has just processed the custom manager to schedule them because
  // they are non-merge nodes, so they had to wait until the parent has ENTERED.

  actJestMoveTimeTo(101);
  expect([f0, f1, f2]).toEqual([ENTERED, EXITED, EXITED]);

  actJestMoveTimeTo(599);
  expect([f0, f1, f2]).toEqual([ENTERED, EXITED, EXITED]);

  actJestMoveTimeTo(601);
  expect([f0, f1, f2]).toEqual([ENTERED, ENTERING, ENTERING]);

  actJestMoveTimeTo(699);
  expect([f0, f1, f2]).toEqual([ENTERED, ENTERING, ENTERING]);

  actJestMoveTimeTo(701);
  expect([f0, f1, f2]).toEqual([ENTERED, ENTERED, ENTERED]);
});

test('Should root node activate merge children nodes in "manager" custom', () => {
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

  const manager: AnimatorSettingsManagerCustom = ({ nodes, duration }) => {
    const times = nodes.map(node => ({ node, time: duration.stagger }));
    return { times };
  };
  render(
    <Animator animator={{ manager, duration: { stagger: 500 } }}>
      <ExampleParent />
      <Animator animator={{ merge: true }}>
        <ExampleChild1 />
      </Animator>
      <Animator animator={{ merge: true }}>
        <ExampleChild2 />
      </Animator>
    </Animator>
  );

  // The selected times to test are just before and just after any of the nodes
  // transition flow state until all of them are ENTERED.

  // The custom manager will process merge children once the parent is ENTERING.

  expect([f0, f1, f2]).toEqual([EXITED, EXITED, EXITED]);

  actJestMoveTimeTo(1);
  expect([f0, f1, f2]).toEqual([ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(99);
  expect([f0, f1, f2]).toEqual([ENTERING, EXITED, EXITED]);

  actJestMoveTimeTo(101);
  expect([f0, f1, f2]).toEqual([ENTERED, EXITED, EXITED]);

  actJestMoveTimeTo(499);
  expect([f0, f1, f2]).toEqual([ENTERED, EXITED, EXITED]);

  actJestMoveTimeTo(501);
  expect([f0, f1, f2]).toEqual([ENTERED, ENTERING, ENTERING]);

  actJestMoveTimeTo(599);
  expect([f0, f1, f2]).toEqual([ENTERED, ENTERING, ENTERING]);

  actJestMoveTimeTo(601);
  expect([f0, f1, f2]).toEqual([ENTERED, ENTERED, ENTERED]);
});
