import type {
  AnimatorManagerName,
  AnimatorManager,
  AnimatorNode
} from '../../types';
import {
  ANIMATOR_MANAGER_NAMES as MANAGERS,
  ANIMATOR_ACTIONS as ACTIONS
} from '../../constants';

type AnimatorManagerCreator = (node: AnimatorNode) => AnimatorManager;

const createAnimatorManagerParallel: AnimatorManagerCreator = () => {
  const getDurationEnter = (children: AnimatorNode[]): number => {
    return children.reduce((total, child) => Math.max(total, child.duration.enter), 0);
  };

  const enterChildren = (children: AnimatorNode[]): void => {
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

  const getDurationEnter = (children: AnimatorNode[]): number => {
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

  const enterChildren = (children: AnimatorNode[]): void => {
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

const createAnimatorManagerSequence: AnimatorManagerCreator = () => {
  let reservedUntilTime = 0;

  const getDurationEnter = (children: AnimatorNode[]): number => {
    return children.reduce((total, child) => total + child.duration.enter, 0);
  };

  const enterChildren = (children: AnimatorNode[]): void => {
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

const createAnimatorManager = (node: AnimatorNode, manager: AnimatorManagerName): AnimatorManager => {
  switch (manager) {
    case MANAGERS.stagger: return createAnimatorManagerStagger(node);
    case MANAGERS.sequence: return createAnimatorManagerSequence(node);
    default: return createAnimatorManagerParallel(node);
  }
};

export { createAnimatorManager };
