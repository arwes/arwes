/* eslint-env jest */

import { mockAnimatorChildRef } from '../../../test-utils/mockAnimatorChildRef';
import { AnimatorChildRef } from '../../constants';
import { getChildrenNodesStaggerActivationTimes } from './getChildrenNodesStaggerActivationTimes';

test('Should get empty start times and 0 total duration when no nodes provided', () => {
  const nodes: AnimatorChildRef[] = [];
  const parentDuration = { enter: 0, exit: 0, stagger: 25, delay: 0, offset: 0 };
  const received = getChildrenNodesStaggerActivationTimes(nodes, parentDuration);
  const expected = {
    duration: 0,
    times: []
  };
  expect(received).toEqual(expected);
});

test('Should get staggering enter times and total duration for children nodes', () => {
  const nodes = [
    mockAnimatorChildRef(0, { enter: 100 }),
    mockAnimatorChildRef(1, { enter: 100 }),
    mockAnimatorChildRef(2, { enter: 100 }),
    mockAnimatorChildRef(3, { enter: 100 }),
    mockAnimatorChildRef(4, { enter: 100 })
  ];
  const parentDuration = { enter: 0, exit: 0, stagger: 50, delay: 0, offset: 0 };
  const received = getChildrenNodesStaggerActivationTimes(nodes, parentDuration);
  const expected = {
    duration: 300,
    times: [
      { node: nodes[0], time: 0 },
      { node: nodes[1], time: 50 },
      { node: nodes[2], time: 100 },
      { node: nodes[3], time: 150 },
      { node: nodes[4], time: 200 }
    ]
  };
  expect(received).toEqual(expected);
});

test('Should get staggering enter times and total duration for children nodes with duration offsets', () => {
  const nodes: AnimatorChildRef[] = [
    mockAnimatorChildRef(0, { enter: 100 }),
    mockAnimatorChildRef(1, { enter: 100 }),
    mockAnimatorChildRef(2, { enter: 100, offset: 30 }),
    mockAnimatorChildRef(3, { enter: 100 }),
    mockAnimatorChildRef(4, { enter: 100 })
  ];
  const parentDuration = { enter: 0, exit: 0, stagger: 25, delay: 0, offset: 0 };
  const received = getChildrenNodesStaggerActivationTimes(nodes, parentDuration);
  const expected = {
    duration: 230,
    times: [
      { node: nodes[0], time: 0 },
      { node: nodes[1], time: 25 },
      { node: nodes[2], time: 80 }, // 50ms on normal behavior, plus 30ms offset
      { node: nodes[3], time: 105 },
      { node: nodes[4], time: 130 }
    ]
  };
  expect(received).toEqual(expected);
});
