import type {
  AnimatorManagerName,
  AnimatorManager,
  AnimatorSubscriber,
  AnimatorNode
} from '../../types';
import {
  ANIMATOR_MANAGER_NAMES as MANAGERS,
  ANIMATOR_ACTIONS as ACTIONS,
  ANIMATOR_STATES as STATES
} from '../../constants';

type AnimatorManagerCreator = (node: AnimatorNode) => AnimatorManager;

const createAnimatorManagerParallel: AnimatorManagerCreator = node => {
  const getDurationEnter = (childrenProvided?: AnimatorNode[]): number => {
    const children = childrenProvided ?? Array.from(node.children);
    return children.reduce((total, child) => Math.max(total, child.duration.enter), 0);
  };

  const enterChildren = (childrenProvided?: AnimatorNode[]): void => {
    const children = childrenProvided ?? Array.from(node.children);
    for (const child of children) {
      child.send(ACTIONS.enter);
    }
  };

  return Object.freeze({
    name: MANAGERS.parallel,
    getDurationEnter,
    enterChildren
  });
};

const createAnimatorManagerStagger: AnimatorManagerCreator = node => {
  let reservedUntilTime = 0;

  const getDurationEnter = (childrenProvided?: AnimatorNode[]): number => {
    const children = childrenProvided ?? Array.from(node.children);
    if (!children.length) {
      return 0;
    }

    const { duration } = node.control.getSettings();
    const lastChild = children[children.length - 1];

    // TODO: If any of the children has a longer enter duration which surpasses
    // the accumulated + last child enter duration value, the total duration should
    // be greater.

    return (duration.stagger * (children.length - 1)) + lastChild.duration.enter;
  };

  const enterChildren = (childrenProvided?: AnimatorNode[]): void => {
    const children = childrenProvided ?? Array.from(node.children);
    const parentSettings = node.control.getSettings();
    const stagger = (parentSettings.duration.stagger || 0) * 1000; // seconds to ms

    const now = Date.now();

    reservedUntilTime = Math.max(reservedUntilTime, now);

    for (const child of children) {
      const childSettings = child.control.getSettings();
      const offset = (childSettings.duration.offset || 0) * 1000; // seconds to ms

      reservedUntilTime = reservedUntilTime + offset;

      const time = (reservedUntilTime - now) / 1000; // ms to seconds
      const delay = childSettings.duration.delay || 0;

      reservedUntilTime = reservedUntilTime + stagger;

      child.scheduler.start(time + delay, () => child.send(ACTIONS.enter));
    }
  };

  return Object.freeze({
    name: MANAGERS.stagger,
    getDurationEnter,
    enterChildren
  });
};

const createAnimatorManagerSequence: AnimatorManagerCreator = node => {
  let reservedUntilTime = 0;

  const getDurationEnter = (childrenProvided?: AnimatorNode[]): number => {
    const children = childrenProvided ?? Array.from(node.children);
    return children.reduce((total, child) => total + child.duration.enter, 0);
  };

  const enterChildren = (childrenProvided?: AnimatorNode[]): void => {
    const children = childrenProvided ?? Array.from(node.children);
    const now = Date.now();

    reservedUntilTime = Math.max(reservedUntilTime, now);

    for (const child of children) {
      const childSettings = child.control.getSettings();
      const offset = (childSettings.duration.offset || 0) * 1000; // seconds to ms
      const durationEnter = child.duration.enter * 1000; // seconds to ms

      reservedUntilTime = reservedUntilTime + offset;

      const time = (reservedUntilTime - now) / 1000; // ms to seconds
      const delay = childSettings.duration.delay || 0;

      reservedUntilTime += durationEnter;

      child.scheduler.start(time + delay, () => child.send(ACTIONS.enter));
    }
  };

  return Object.freeze({
    name: MANAGERS.sequence,
    getDurationEnter,
    enterChildren
  });
};

const createAnimatorManagerSwitch: AnimatorManagerCreator = node => {
  let nodeVisible: AnimatorNode | undefined;
  let nodeVisibleSubscriber: AnimatorSubscriber | undefined;

  const getDurationEnter = (): number => {
    if (nodeVisible) {
      return nodeVisible.duration.enter;
    }

    const nodeVisibleCurrent = Array.from(node.children).find(child => {
      const { condition } = child.control.getSettings();
      return condition ? condition(child) : true;
    });

    if (nodeVisibleCurrent) {
      return nodeVisibleCurrent.duration.enter;
    }

    return 0;
  };

  const enterChildren = (): void => {
    const children = Array.from(node.children);
    const nodeVisibleNew = children.find(child => {
      const { condition } = child.control.getSettings();
      return condition ? condition(child) : true;
    });

    // TODO: What if "nodeVisibleSubscriber" already exists?

    if (nodeVisibleNew) {
      if (nodeVisibleNew === nodeVisible) {
        nodeVisibleNew.send(ACTIONS.enter);
      }
      else {
        if (nodeVisible) {
          nodeVisibleSubscriber = nodeSubscribed => {
            if (nodeSubscribed.state === STATES.exited) {
              nodeSubscribed.unsubscribe(nodeVisibleSubscriber as AnimatorSubscriber);
              nodeVisibleSubscriber = undefined;
              nodeVisibleNew.send(ACTIONS.enter);
            }
          };
          nodeVisible.subscribe(nodeVisibleSubscriber);
          nodeVisible.send(ACTIONS.exit);
        }
        else {
          nodeVisibleNew.send(ACTIONS.enter);
        }
      }
    }

    children
      .filter(child => child !== nodeVisibleNew)
      .forEach(child => child.send(ACTIONS.exit));

    nodeVisible = nodeVisibleNew;
  };

  const destroy = (): void => {
    if (nodeVisible && nodeVisibleSubscriber) {
      nodeVisible.unsubscribe(nodeVisibleSubscriber);
    }
  };

  return Object.freeze({
    name: MANAGERS.switch,
    getDurationEnter,
    enterChildren,
    destroy
  });
};

const createAnimatorManager = (node: AnimatorNode, manager: AnimatorManagerName): AnimatorManager => {
  switch (manager) {
    case MANAGERS.stagger: return createAnimatorManagerStagger(node);
    case MANAGERS.sequence: return createAnimatorManagerSequence(node);
    case MANAGERS.switch: return createAnimatorManagerSwitch(node);
    default: return createAnimatorManagerParallel(node);
  }
};

export { createAnimatorManager };
