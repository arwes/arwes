import { getChildrenNodesSequenceActivationTimes } from '../getChildrenNodesSequenceActivationTimes';
import { getChildrenNodesStaggerActivationTimes } from '../getChildrenNodesStaggerActivationTimes';
import { makeGetChildrenNodesActivations } from './makeGetChildrenNodesActivations';

const getChildrenNodesActivations = makeGetChildrenNodesActivations({
  getChildrenNodesSequenceActivationTimes,
  getChildrenNodesStaggerActivationTimes
});

export { getChildrenNodesActivations };
