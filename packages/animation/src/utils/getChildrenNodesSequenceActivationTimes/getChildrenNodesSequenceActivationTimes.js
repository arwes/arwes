function getChildrenNodesSequenceActivationTimes (nodes) {
  let duration = 0;

  const times = nodes.reduce((items, node, index) => {
    let time = 0;

    if (index !== 0) {
      const prevItem = items[index - 1];
      time = prevItem.time + prevItem.node.getDuration().enter;
    }

    duration = time + node.getDuration().enter;

    const item = { node, time };

    return [...items, item];
  }, []);

  return { duration, times };
}

export { getChildrenNodesSequenceActivationTimes };
