/* eslint-env jest */

import { mockAnimatorRefChild } from '../../../test-utils/mockAnimatorRefChild';
import { AnimatorRefChild } from '../../constants';
import { getChildrenNodesSequenceActivationTimes } from './getChildrenNodesSequenceActivationTimes';

test('Should get empty start times and 0 total duration when no nodes provided', () => {
  const nodes: AnimatorRefChild[] = [];
  const received = getChildrenNodesSequenceActivationTimes(nodes);
  const expected = {
    duration: 0,
    times: []
  };
  expect(received).toEqual(expected);
});

test('Should get sequence start times and total duration for children nodes', () => {
  const nodes: AnimatorRefChild[] = [
    mockAnimatorRefChild(0, { enter: 400 }),
    mockAnimatorRefChild(1, { enter: 200 }),
    mockAnimatorRefChild(2, { enter: 100 }),
    mockAnimatorRefChild(3, { enter: 500 }),
    mockAnimatorRefChild(4, { enter: 300 })
  ];
  const received = getChildrenNodesSequenceActivationTimes(nodes);
  const expected = {
    duration: 1500,
    times: [
      { node: nodes[0], time: 0 },
      { node: nodes[1], time: 400 },
      { node: nodes[2], time: 600 },
      { node: nodes[3], time: 700 },
      { node: nodes[4], time: 1200 }
    ]
  };
  expect(received).toEqual(expected);
});

test('Should get sequence start times and total duration for children nodes with duration offsets', () => {
  const nodes: AnimatorRefChild[] = [
    mockAnimatorRefChild(0, { enter: 400 }),
    mockAnimatorRefChild(1, { enter: 200 }),
    mockAnimatorRefChild(2, { enter: 100, offset: 70 }),
    mockAnimatorRefChild(3, { enter: 500 }),
    mockAnimatorRefChild(4, { enter: 300 })
  ];
  const received = getChildrenNodesSequenceActivationTimes(nodes);
  const expected = {
    duration: 1570,
    times: [
      { node: nodes[0], time: 0 },
      { node: nodes[1], time: 400 },
      { node: nodes[2], time: 670 }, // 600ms on normal behavior plus 70ms offset
      { node: nodes[3], time: 770 },
      { node: nodes[4], time: 1270 }
    ]
  };
  expect(received).toEqual(expected);
});
