import { useContext } from 'react';

import { AnimatorContext } from '../AnimatorContext';

function useAnimator () {
  return useContext(AnimatorContext);
}

export { useAnimator };
