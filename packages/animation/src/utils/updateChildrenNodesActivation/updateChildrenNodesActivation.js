import {
  ENTERED,
  ENTERING,
  EXITING,
  PARALLEL,
  SEQUENCE,
  STAGGER
} from '../../constants';
import { getChildrenNodesSequenceActivationTimes } from '../getChildrenNodesSequenceActivationTimes';
import { getChildrenNodesStaggerActivationTimes } from '../getChildrenNodesStaggerActivationTimes';

// TODO: Rename to getter.
function updateChildrenNodesActivation ({ nodes, duration, flow, manager }) {
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

  // On exiting, all nodes exit at the same time in parallel.
  if (flow.value === EXITING || manager === PARALLEL) {
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
    // TODO: Throw error.
  }
}

export { updateChildrenNodesActivation };
