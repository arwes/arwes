import type {
  AnimatorManagerName,
  AnimatorManager,
  AnimatorNode
} from '../../types';
import {
  ANIMATOR_MANAGER_NAMES as MANAGERS,
  ANIMATOR_ACTIONS as ACTIONS
} from '../../constants';

type AnimatorManagerCreator = () => AnimatorManager;

const createAnimatorManagerParallel: AnimatorManagerCreator = () => {
  const getDurationEnter = (parent: AnimatorNode, children: AnimatorNode[]): number => {
    return children.reduce((total, child) => Math.max(total, child.duration.enter), 0);
  };

  const enterChildren = (parent: AnimatorNode, children: AnimatorNode[]): void => {
    for (const child of children) {
      child.send(ACTIONS.enter);
    }
  };

  return Object.freeze({ name: MANAGERS.parallel, getDurationEnter, enterChildren });
};

const createAnimatorManagerStagger: AnimatorManagerCreator = () => {
  let reservedUntilTime = 0;

  const getDurationEnter = (parent: AnimatorNode, children: AnimatorNode[]): number => {
    if (!children.length) {
      return 0;
    }

    const { duration } = parent.control.getSettings();
    const lastChild = children[children.length - 1];

    return (duration.stagger * (children.length - 1)) + lastChild.duration.enter;
  };

  const enterChildren = (parent: AnimatorNode, children: AnimatorNode[]): void => {
    const parentSettings = parent.control.getSettings();
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

  return Object.freeze({ name: MANAGERS.stagger, getDurationEnter, enterChildren });
};

const createAnimatorManagerSequence: AnimatorManagerCreator = () => {
  let reservedUntilTime = 0;

  const getDurationEnter = (parent: AnimatorNode, children: AnimatorNode[]): number => {
    return children.reduce((total, child) => total + child.duration.enter, 0);
  };

  const enterChildren = (parent: AnimatorNode, children: AnimatorNode[]): void => {
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

  return Object.freeze({ name: MANAGERS.sequence, getDurationEnter, enterChildren });
};

const createAnimatorManager = (manager: AnimatorManagerName): AnimatorManager => {
  switch (manager) {
    case MANAGERS.stagger: return createAnimatorManagerStagger();
    case MANAGERS.sequence: return createAnimatorManagerSequence();
    default: return createAnimatorManagerParallel();
  }
};

export { createAnimatorManager };
