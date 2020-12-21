import { useContext } from 'react';

import { AnimatorProvidedSettings } from '../constants';
import { AnimatorContext } from '../AnimatorContext';

function useAnimator (): AnimatorProvidedSettings | undefined {
  return useContext(AnimatorContext);
}

export { useAnimator };
