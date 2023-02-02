/* eslint-env jest */

import type { AnimatorNode } from '../../types';
import { ANIMATOR_MANAGER_NAMES } from '../../constants';
import { createAnimatorManager } from './createAnimatorManager';

Object.values(ANIMATOR_MANAGER_NAMES).forEach(managerName => {
  test(`Should create a node manager "${managerName}" with predefined structure`, () => {
    const node = {} as unknown as AnimatorNode;
    const manager = createAnimatorManager(node, managerName);
    expect(manager.name).toBe(managerName);
    expect(manager.getDurationEnter).toBeInstanceOf(Function);
    expect(manager.enterChildren).toBeInstanceOf(Function);
    if (manager.destroy !== undefined) {
      expect(manager.destroy).toBeInstanceOf(Function);
    }
  });
});
