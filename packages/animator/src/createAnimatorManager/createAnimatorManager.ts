import type {
  AnimatorManagerName,
  AnimatorManager,
  AnimatorNode
} from '../types';
import { ANIMATOR_MANAGER_NAMES, ANIMATOR_ACTIONS } from '../constants';

const { parallel, stagger, sequence } = ANIMATOR_MANAGER_NAMES;
const { enter } = ANIMATOR_ACTIONS;

type AnimatorManagerCreator = (parentNode: AnimatorNode) => AnimatorManager;

const createAnimatorManagerParallel: AnimatorManagerCreator = () => {
  const enterChildren = (children: AnimatorNode[]): void => {
    children.forEach(child => child.send(enter));
  };
  return Object.freeze({ name: parallel, enterChildren });
};

const createAnimatorManagerStagger: AnimatorManagerCreator = parentNode => {
  let reservedUntilTime: number | undefined;

  const enterChildren = (children: AnimatorNode[]): void => {
    const parentSettings = parentNode.control.getSettings();
    const stagger = (parentSettings.duration?.stagger || 0) * 1000; // seconds to ms

    const now = Date.now();

    reservedUntilTime = reservedUntilTime !== undefined
      ? Math.max(reservedUntilTime, now)
      : now;

    children.forEach(child => {
      const childSettings = child.control.getSettings();
      const offset = (childSettings.duration?.offset || 0) * 1000; // seconds to ms

      reservedUntilTime = (reservedUntilTime as number) + offset;

      const delay = (reservedUntilTime - now) / 1000; // ms to seconds

      reservedUntilTime = reservedUntilTime + stagger;

      child.scheduler.start(delay, () => child.send(enter));
    });
  };

  return Object.freeze({ name: stagger, enterChildren });
};

const createAnimatorManagerSequence: AnimatorManagerCreator = () => {
  const enterChildren = (): void => {};
  return Object.freeze({ name: sequence, enterChildren });
};

const createAnimatorManager = (
  parentNode: AnimatorNode,
  manager: AnimatorManagerName
): AnimatorManager => {
  switch (manager) {
    case stagger: return createAnimatorManagerStagger(parentNode);
    case sequence: return createAnimatorManagerSequence(parentNode);
    default: return createAnimatorManagerParallel(parentNode);
  }
};

export { createAnimatorManager };
