import { useContext } from 'react';
import { AnimationContext } from '../AnimationContext';

function useAnimation () {
  const animation = useContext(AnimationContext);
  return { ...animation };
}

export { useAnimation };
