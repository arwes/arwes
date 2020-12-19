import { AnimatorSettingsDurationObject, AnimatorRefChild } from '../src/constants';

function mockAnimatorRefChild (
  id: number,
  duration: AnimatorSettingsDurationObject,
  merge?: boolean
): AnimatorRefChild {
  return {
    id,
    getDuration: () => ({ enter: 0, exit: 0, stagger: 0, delay: 0, offset: 0, ...duration }),
    getIsMerge: () => !!merge,
    setActivate: () => null
  };
}

export { mockAnimatorRefChild };
