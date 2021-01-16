import {
  AnimatorChildRef,
  AnimatorChildActivations,
  AnimatorChildActivationTime
} from '../../constants';

function getChildrenNodesSequenceActivationTimes (
  nodes: AnimatorChildRef[]
): AnimatorChildActivations {
  let duration = 0;

  const times = nodes.reduce(
    (items: AnimatorChildActivationTime[], node, index) => {
      const nodeDuration = node.getDuration();
      const offset = nodeDuration.offset || 0;

      let time = offset;

      if (index !== 0) {
        const prevItem = items[index - 1];
        time = prevItem.time + prevItem.node.getDuration().enter + offset;
      }

      duration = time + nodeDuration.enter;

      const item = { node, time };

      return [...items, item];
    },
    []
  );

  return { duration, times };
}

export { getChildrenNodesSequenceActivationTimes };
