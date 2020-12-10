/* eslint-env jest */

import {
  ENTERED,
  PARALLEL,
  SEQUENCE,
  STAGGER
} from '../../constants';
import { updateChildrenNodesActivation } from './updateChildrenNodesActivation';

test.todo('Should activate non-merge nodes on "flowValue=entered" in "manager=parallel"');

[PARALLEL, SEQUENCE, STAGGER].forEach(managerName => {
  test.todo(`Should activate merge nodes on "flowValue=entering" in "manager=${managerName}"`);

  test.todo(`Should deactivate all nodes on "flowValue=exiting" in "manager=${managerName}"`);
});

test.todo('Should activate merge nodes on "flowValue=entering" in custom "manager"');

test('Should activate non-merge nodes on "flowValue=entered" in custom "manager"', () => {
  const nodes = [
    { id: 'a', getIsMerge: () => false, setActivate: jest.fn() },
    { id: 'b', getIsMerge: () => false, setActivate: jest.fn() },
    { id: 'c', getIsMerge: () => true, setActivate: jest.fn() },
    { id: 'd', getIsMerge: () => false, setActivate: jest.fn() }
  ];
  const duration = { enter: 100, exit: 100 };
  const flow = { value: ENTERED };
  const managedResult = {
    duration: 300,
    times: [
      { node: nodes[0], time: 10 },
      { node: nodes[1], time: 20 },
      // The "c" was filtered.
      { node: nodes[3], time: 30 }
    ]
  };
  const manager = jest.fn(() => managedResult);
  const received = updateChildrenNodesActivation({ nodes, duration, flow, manager });

  const nodesUpdated = nodes.filter(node => !node.getIsMerge());
  expect(manager).toHaveBeenCalledWith({ nodes: nodesUpdated, duration });
  expect(received).toEqual(managedResult);
});

test.todo('Should deactivate all nodes on "flowValue=exiting" in custom "manager"');
