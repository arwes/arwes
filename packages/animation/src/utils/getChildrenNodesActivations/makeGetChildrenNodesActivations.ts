import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  PARALLEL,
  SEQUENCE,
  STAGGER,
  AnimatorRefChild,
  AnimatorDuration,
  AnimatorFlow,
  AnimatorSettingsManager,
  AnimatorChildrenActivations
} from '../../constants';

// TODO: Merge this functionality with Animator component.

interface GetChildrenNodesActivationsStatus {
  nodes: AnimatorRefChild[]
  duration: AnimatorDuration
  flow: AnimatorFlow
  manager: AnimatorSettingsManager
}

type GetChildrenNodesActivations = (status: GetChildrenNodesActivationsStatus) => AnimatorChildrenActivations;

function makeGetChildrenNodesActivations ({
  getChildrenNodesSequenceActivationTimes,
  getChildrenNodesStaggerActivationTimes
}: any): GetChildrenNodesActivations {
  function getChildrenNodesActivations (status: GetChildrenNodesActivationsStatus): AnimatorChildrenActivations {
    const { nodes, duration, flow, manager } = status;

    let nodesToUpdate: AnimatorRefChild[] = [];

    if (flow.value === ENTERING) {
      nodesToUpdate = nodes.filter(node => node.getIsMerge());
    }
    else if (flow.value === ENTERED) {
      nodesToUpdate = nodes.filter(node => !node.getIsMerge());
    }
    else if (flow.value === EXITING) {
      nodesToUpdate = nodes;
    }

    if (flow.value === EXITED) {
      return { times: [] };
    }
    // On exiting, all nodes exit at the same time in parallel.
    else if (flow.value === EXITING || manager === PARALLEL) {
      const times = nodesToUpdate.map(node => ({ node, time: 0 }));
      return { times };
    }
    else if (manager === SEQUENCE) {
      return getChildrenNodesSequenceActivationTimes(nodesToUpdate);
    }
    else if (manager === STAGGER) {
      return getChildrenNodesStaggerActivationTimes(nodesToUpdate, duration);
    }
    else if (typeof manager === 'function') {
      return manager({ nodes: nodesToUpdate, duration });
    }
    else {
      throw new Error(`Manager "${String(manager)}" is not supported.`);
    }
  }

  return getChildrenNodesActivations;
}

export {
  GetChildrenNodesActivationsStatus,
  GetChildrenNodesActivations,
  makeGetChildrenNodesActivations
};
