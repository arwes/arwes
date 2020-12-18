import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  PARALLEL,
  SEQUENCE,
  STAGGER
} from '../../constants';

function makeGetChildrenNodesActivations ({
  getChildrenNodesSequenceActivationTimes,
  getChildrenNodesStaggerActivationTimes
}) {
  function getChildrenNodesActivations ({ nodes, duration, flow, manager }) {
    let nodesToUpdate = [];

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
      throw new Error(`Manager "${manager}" is not supported.`);
    }
  }

  return getChildrenNodesActivations;
}

export { makeGetChildrenNodesActivations };
