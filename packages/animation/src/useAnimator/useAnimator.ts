import { useContext } from 'react';

import { AnimatorRef } from '../constants';
import { AnimatorContext } from '../AnimatorContext';

function useAnimator (): AnimatorRef | undefined {
  return useContext(AnimatorContext);
}

export { useAnimator };
