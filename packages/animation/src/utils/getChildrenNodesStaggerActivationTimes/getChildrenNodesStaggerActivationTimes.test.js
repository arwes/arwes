/* eslint-env jest */

import { getChildrenNodesStaggerActivationTimes } from './getChildrenNodesStaggerActivationTimes';

test('Should get empty start times and 0 total duration when no nodes provided', () => {
  const nodes = [];
  const parentDuration = { stagger: 25 };
  const received = getChildrenNodesStaggerActivationTimes(nodes, parentDuration);
  const expected = {
    duration: 0,
    times: []
  };
  expect(received).toEqual(expected);
});

test('Should get staggering enter times and total duration for children nodes', () => {
  const nodes = [
    { id: 0, getDuration: () => ({ enter: 100 }) },
    { id: 1, getDuration: () => ({ enter: 100 }) },
    { id: 2, getDuration: () => ({ enter: 100 }) },
    { id: 3, getDuration: () => ({ enter: 100 }) },
    { id: 4, getDuration: () => ({ enter: 100 }) }
  ];
  const parentDuration = { stagger: 50 };
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
