import { useContext } from 'react';

import type { AnimatorInterface } from '../types';
import { AnimatorContext } from '../utils/AnimatorContext';

const useAnimator = (): AnimatorInterface | undefined => {
  return useContext(AnimatorContext);
};

export { useAnimator };
