/* istanbul ignore file */

import { AnimatorSettingsDuration, AnimatorChildRef } from '../src/constants';

function mockAnimatorChildRef (
  id: number,
  duration: AnimatorSettingsDuration,
  merge?: boolean
): AnimatorChildRef {
  return {
    id,
    getDuration: () => ({ enter: 0, exit: 0, stagger: 0, delay: 0, offset: 0, ...duration }),
    getIsMerge: () => !!merge,
    setActivate: () => null
  };
}

export { mockAnimatorChildRef };
