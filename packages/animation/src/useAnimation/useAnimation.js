import { useContext } from 'react';

import { AnimationContext } from '../AnimationContext';

function useAnimation () {
  return useContext(AnimationContext);
}

export { useAnimation };
