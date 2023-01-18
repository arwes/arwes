import type {
  AnimatorManagerName,
  AnimatorManager,
  AnimatorNode
} from '../../types';
import {
  ANIMATOR_MANAGER_NAMES as MANAGERS,
  ANIMATOR_ACTIONS as ACTIONS
} from '../../constants';

type AnimatorManagerCreator = (parent: AnimatorNode) => AnimatorManager;

const createAnimatorManagerParallel: AnimatorManagerCreator = () => {
  const enterChildren = (children: AnimatorNode[]): void => {
    children.forEach(child => child.send(ACTIONS.enter));
  };
  return Object.freeze({ name: MANAGERS.parallel, enterChildren });
};

const createAnimatorManagerStagger: AnimatorManagerCreator = parent => {
  let reservedUntilTime: number | undefined;

  const enterChildren = (children: AnimatorNode[]): void => {
    const parentSettings = parent.control.getSettings();
    const stagger = (parentSettings.duration.stagger || 0) * 1000; // seconds to ms

    const now = Date.now();

    reservedUntilTime = reservedUntilTime !== undefined
      ? Math.max(reservedUntilTime, now)
      : now;

    children.forEach(child => {
      const childSettings = child.control.getSettings();
      const offset = (childSettings.duration.offset || 0) * 1000; // seconds to ms

      reservedUntilTime = (reservedUntilTime as number) + offset;

      const delay = (reservedUntilTime - now) / 1000; // ms to seconds

      reservedUntilTime = reservedUntilTime + stagger;

      child.scheduler.start(delay, () => child.send(ACTIONS.enter));
    });
  };

  return Object.freeze({ name: MANAGERS.stagger, enterChildren });
};

const createAnimatorManagerSequence: AnimatorManagerCreator = () => {
  const enterChildren = (): void => {};
  return Object.freeze({ name: MANAGERS.sequence, enterChildren });
};

const createAnimatorManager = (
  parentNode: AnimatorNode,
  manager: AnimatorManagerName
): AnimatorManager => {
  switch (manager) {
    case MANAGERS.stagger: return createAnimatorManagerStagger(parentNode);
    case MANAGERS.sequence: return createAnimatorManagerSequence(parentNode);
    default: return createAnimatorManagerParallel(parentNode);
  }
};

export { createAnimatorManager };
