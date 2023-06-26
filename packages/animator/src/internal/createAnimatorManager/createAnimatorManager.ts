import type {
  AnimatorManagerName,
  AnimatorManager,
  AnimatorNode
} from '../../types';
import {
  ANIMATOR_MANAGER_NAMES as MANAGERS,
  ANIMATOR_ACTIONS as ACTIONS,
  ANIMATOR_STATES as STATES
} from '../../constants';

type AnimatorManagerCreator = (node: AnimatorNode, name: AnimatorManagerName) => AnimatorManager;

const createAnimatorManagerParallel: AnimatorManagerCreator = node => {
  const getChildren = (childrenProvided?: AnimatorNode[]): AnimatorNode[] => {
    const children = (childrenProvided ?? Array.from(node.children));
    return children.filter(child => {
      const { condition } = child.control.getSettings();
      return condition ? condition(child) : true;
    });
  };

  const getDurationEnter = (childrenProvided?: AnimatorNode[]): number => {
    const children = getChildren(childrenProvided);
    return children.reduce((total, child) => Math.max(total, child.duration.enter), 0);
  };

  const enterChildren = (childrenProvided?: AnimatorNode[]): void => {
    const children = getChildren(childrenProvided);
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

const createAnimatorManagerStagger: AnimatorManagerCreator = (node, name) => {
  let reservedUntilTime = 0;

  const getChildren = (childrenProvided?: AnimatorNode[]): AnimatorNode[] => {
    const children = (childrenProvided ?? Array.from(node.children));
    return children.filter(child => {
      const { condition } = child.control.getSettings();
      return condition ? condition(child) : true;
    });
  };

  const getDurationEnter = (childrenProvided?: AnimatorNode[]): number => {
    const children = getChildren(childrenProvided);

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
    let children = getChildren(childrenProvided);

    const parentSettings = node.control.getSettings();
    const stagger = (parentSettings.duration.stagger || 0) * 1000; // seconds to ms

    if (name === MANAGERS.staggerReverse) {
      children = children.reverse();
    }

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
    name,
    getDurationEnter,
    enterChildren
  });
};

const createAnimatorManagerSequence: AnimatorManagerCreator = (node, name) => {
  let reservedUntilTime = 0;

  const getChildren = (childrenProvided?: AnimatorNode[]): AnimatorNode[] => {
    const children = (childrenProvided ?? Array.from(node.children));
    return children.filter(child => {
      const { condition } = child.control.getSettings();
      return condition ? condition(child) : true;
    });
  };

  const getDurationEnter = (childrenProvided?: AnimatorNode[]): number => {
    const children = getChildren(childrenProvided);
    return children.reduce((total, child) => total + child.duration.enter, 0);
  };

  const enterChildren = (childrenProvided?: AnimatorNode[]): void => {
    let children = getChildren(childrenProvided);

    const now = Date.now();

    if (name === MANAGERS.sequenceReverse) {
      children = children.reverse();
    }

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
    name,
    getDurationEnter,
    enterChildren
  });
};

const createAnimatorManagerSwitch: AnimatorManagerCreator = node => {
  let nodeHiding: AnimatorNode | undefined;
  let nodeVisible: AnimatorNode | undefined;
  let nodeSubscriberUnsubscribe: (() => void) | undefined;

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
    nodeSubscriberUnsubscribe?.();
    nodeSubscriberUnsubscribe = undefined;

    const children = Array.from(node.children);
    const nodeVisibleNew = children.find(child => {
      const { condition } = child.control.getSettings();
      return condition ? condition(child) : true;
    });

    const onNextEnter = (): void => {
      if (nodeVisibleNew) {
        if (nodeVisibleNew === nodeVisible) {
          nodeVisibleNew.send(ACTIONS.enter);
        }
        else {
          if (nodeVisible) {
            nodeHiding = nodeVisible;
            nodeSubscriberUnsubscribe = nodeHiding.subscribe(nodeHidingSubscribed => {
              if (nodeHidingSubscribed.state === STATES.exited) {
                nodeSubscriberUnsubscribe?.();
                nodeSubscriberUnsubscribe = undefined;
                nodeHiding = undefined;
                nodeVisibleNew.send(ACTIONS.enter);
              }
            });
            nodeHiding?.send(ACTIONS.exit);
          }
          else {
            nodeVisibleNew.send(ACTIONS.enter);
            nodeHiding = undefined;
          }
          nodeVisible = nodeVisibleNew;
        }
      }
      else {
        nodeHiding = nodeVisible;
        nodeVisible = undefined;
      }
    };

    if (nodeHiding) {
      nodeSubscriberUnsubscribe = nodeHiding.subscribe(nodeHiding => {
        if (nodeHiding.state === STATES.exited) {
          onNextEnter();
        }
      });
    }
    else {
      onNextEnter();
    }

    children
      .filter(child => child !== nodeVisibleNew)
      .forEach(child => child.send(ACTIONS.exit));
  };

  const destroy = (): void => {
    nodeHiding = undefined;
    nodeVisible = undefined;

    nodeSubscriberUnsubscribe?.();
    nodeSubscriberUnsubscribe = undefined;
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
    case MANAGERS.stagger: return createAnimatorManagerStagger(node, MANAGERS.stagger);
    case MANAGERS.staggerReverse: return createAnimatorManagerStagger(node, MANAGERS.staggerReverse);
    case MANAGERS.sequence: return createAnimatorManagerSequence(node, MANAGERS.sequence);
    case MANAGERS.sequenceReverse: return createAnimatorManagerSequence(node, MANAGERS.sequenceReverse);
    case MANAGERS.switch: return createAnimatorManagerSwitch(node, MANAGERS.switch);
    default: return createAnimatorManagerParallel(node, MANAGERS.parallel);
  }
};

export { createAnimatorManager };
