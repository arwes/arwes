function getChildrenNodesStaggerActivationTimes (nodes, parentDuration) {
  const times = nodes.reduce((items, node, index) => {
    const time = !index ? 0 : index * parentDuration.stagger;
    const item = { node, time };

    return [...items, item];
  }, []);

  const lastItem = times[times.length - 1];
  const duration = !times.length ? 0 : lastItem.time + lastItem.node.getDuration().enter;

  return { duration, times };
}

export { getChildrenNodesStaggerActivationTimes };
