/* eslint-env jest */

import { mockAnimatorRefChild } from '../../../__test__/mockAnimatorRefChild';
import {
  ENTERING,
  ENTERED,
  EXITING,
  EXITED,
  PARALLEL,
  SEQUENCE,
  STAGGER,
  AnimatorFlow,
  AnimatorSettingsManager,
  AnimatorRefChild
} from '../../constants';
import { makeGetChildrenNodesActivations } from './makeGetChildrenNodesActivations';

[PARALLEL, SEQUENCE, STAGGER].forEach(managerName => {
  // For each manager, mock a time to set to each of its nodes.
  const managerNodeTimes: any = {
    [PARALLEL]: 0,
    [SEQUENCE]: 777,
    [STAGGER]: 999
  };
  const nodeTime: number = managerNodeTimes[managerName];
  const managerMock: any = (nodes: any) => ({ times: nodes.map((node: any) => ({ node, time: nodeTime })) });
  const dependencies = {
    getChildrenNodesSequenceActivationTimes: managerMock,
    getChildrenNodesStaggerActivationTimes: managerMock
  };

  test(`Should get activation times of merge nodes on "flowValue=entering" in "manager=${managerName}"`, () => {
    const nodes: AnimatorRefChild[] = [
      mockAnimatorRefChild(1, {}, true),
      mockAnimatorRefChild(2, {}, false),
      mockAnimatorRefChild(3, {}, true),
      mockAnimatorRefChild(4, {}, false)
    ];
    const duration = { enter: 100, exit: 100, stagger: 0, delay: 0, offset: 0 };
    const flow: AnimatorFlow = { value: ENTERING };
    const manager = managerName as AnimatorSettingsManager;
    const getChildrenNodesActivations = makeGetChildrenNodesActivations(dependencies);
    const received = getChildrenNodesActivations({ nodes, duration, flow, manager });
    expect(received.times).toHaveLength(2);
    expect(received.times[0]).toEqual({ node: nodes[0], time: nodeTime });
    expect(received.times[1]).toEqual({ node: nodes[2], time: nodeTime });
  });

  test(`Should get activation times of non-merge nodes on "flowValue=entered" in "manager=${managerName}"`, () => {
    const nodes: AnimatorRefChild[] = [
      mockAnimatorRefChild(1, {}, true),
      mockAnimatorRefChild(2, {}, false),
      mockAnimatorRefChild(3, {}, true),
      mockAnimatorRefChild(4, {}, false)
    ];
    const duration = { enter: 100, exit: 100, stagger: 0, delay: 0, offset: 0 };
    const flow: AnimatorFlow = { value: ENTERED };
    const manager = managerName as AnimatorSettingsManager;
    const getChildrenNodesActivations = makeGetChildrenNodesActivations(dependencies);
    const received = getChildrenNodesActivations({ nodes, duration, flow, manager });
    expect(received.times).toHaveLength(2);
    expect(received.times[0]).toEqual({ node: nodes[1], time: nodeTime });
    expect(received.times[1]).toEqual({ node: nodes[3], time: nodeTime });
  });
});

test('Should get activation times of merge nodes on "flowValue=entering" in custom "manager"', () => {
  const nodes: AnimatorRefChild[] = [
    mockAnimatorRefChild(1, {}, true),
    mockAnimatorRefChild(2, {}, false),
    mockAnimatorRefChild(3, {}, true),
    mockAnimatorRefChild(4, {}, false)
  ];
  const duration = { enter: 100, exit: 100, stagger: 0, delay: 0, offset: 0 };
  const flow: AnimatorFlow = { value: ENTERING };
  const managedResult = {
    times: [
      { node: nodes[0], time: 10 },
      // The "b" was filtered.
      { node: nodes[2], time: 20 }
      // The "d" was filtered.
    ]
  };
  const manager = jest.fn(() => managedResult);
  const getChildrenNodesActivations = makeGetChildrenNodesActivations({});
  const received = getChildrenNodesActivations({ nodes, duration, flow, manager });
  const nodesUpdated = nodes.filter(node => node.getIsMerge());

  expect(manager).toHaveBeenCalledWith({ nodes: nodesUpdated, duration });
  expect(received).toEqual(managedResult);
});

test('Should activation times of non-merge nodes on "flowValue=entered" in custom "manager"', () => {
  const nodes: AnimatorRefChild[] = [
    mockAnimatorRefChild(1, {}, true),
    mockAnimatorRefChild(2, {}, false),
    mockAnimatorRefChild(3, {}, true),
    mockAnimatorRefChild(4, {}, false)
  ];
  const duration = { enter: 100, exit: 100, stagger: 0, delay: 0, offset: 0 };
  const flow: AnimatorFlow = { value: ENTERED };
  const managedResult = {
    times: [
      // The "a" was filtered.
      { node: nodes[1], time: 20 },
      // The "c" was filtered.
      { node: nodes[3], time: 30 }
    ]
  };
  const manager = jest.fn(() => managedResult);
  const getChildrenNodesActivations = makeGetChildrenNodesActivations({});
  const received = getChildrenNodesActivations({ nodes, duration, flow, manager });
  const nodesUpdated = nodes.filter(node => !node.getIsMerge());

  expect(manager).toHaveBeenCalledWith({ nodes: nodesUpdated, duration });
  expect(received).toEqual(managedResult);
});

[PARALLEL, STAGGER, SEQUENCE, 'custom'].forEach(managerTypeName => {
  const manager = (managerTypeName === 'custom' ? jest.fn() : managerTypeName) as AnimatorSettingsManager;

  test(`Should get activation times on all nodes on "flowValue=exiting" in "manager=${managerTypeName}"`, () => {
    const nodes: AnimatorRefChild[] = [
      mockAnimatorRefChild(1, {}, true),
      mockAnimatorRefChild(2, {}, false),
      mockAnimatorRefChild(3, {}, true),
      mockAnimatorRefChild(4, {}, false)
    ];
    const duration = { enter: 100, exit: 100, stagger: 0, delay: 0, offset: 0 };
    const flow: AnimatorFlow = { value: EXITING };
    const getChildrenNodesActivations = makeGetChildrenNodesActivations({});
    const received = getChildrenNodesActivations({ nodes, duration, flow, manager });
    const expected = {
      times: [
        { node: nodes[0], time: 0 },
        { node: nodes[1], time: 0 },
        { node: nodes[2], time: 0 },
        { node: nodes[3], time: 0 }
      ]
    };

    expect(received).toEqual(expected);
  });

  test(`Should return empty activations when "flowValue=exited" in manager ${managerTypeName}`, () => {
    const nodes: AnimatorRefChild[] = [
      mockAnimatorRefChild(1, {}, true),
      mockAnimatorRefChild(2, {}, false)
    ];
    const duration = { enter: 100, exit: 100, stagger: 0, delay: 0, offset: 0 };
    const flow: AnimatorFlow = { value: EXITED };
    const getChildrenNodesActivations = makeGetChildrenNodesActivations({});
    const received = getChildrenNodesActivations({ nodes, duration, flow, manager });
    const expected = { times: [] };

    expect(received).toEqual(expected);
  });
});

test('Should throw error if manager is unknown', () => {
  const nodes: AnimatorRefChild[] = [
    mockAnimatorRefChild(1, {}, true),
    mockAnimatorRefChild(1, {}, false)
  ];
  const duration = { enter: 100, exit: 100, stagger: 0, delay: 0, offset: 0 };
  const flow: AnimatorFlow = { value: ENTERED };
  const getChildrenNodesActivations = makeGetChildrenNodesActivations({});
  const manager: any = 'xxx';
  expect(() => getChildrenNodesActivations({ nodes, duration, flow, manager })).toThrow();
});
