import {
  AnimatorDuration,
  AnimatorChildRef,
  AnimatorChildActivations,
  AnimatorChildActivationTime
} from '../../constants';

function getChildrenNodesStaggerActivationTimes (
  nodes: AnimatorChildRef[],
  parentDuration: AnimatorDuration
): AnimatorChildActivations {
  let accumulatedOffset = 0;

  const times = nodes.reduce(
    (items: AnimatorChildActivationTime[], node, index) => {
      accumulatedOffset += node.getDuration().offset || 0;

      const normalTime = !index ? 0 : index * parentDuration.stagger;
      const time = normalTime + accumulatedOffset;
      const item = { node, time };

      return [...items, item];
    },
    []
  );

  const lastItem = times[times.length - 1];

  // Assuming all children nodes have the same duration.
  const duration = !times.length ? 0 : lastItem.time + lastItem.node.getDuration().enter;

  return { duration, times };
}

export { getChildrenNodesStaggerActivationTimes };
