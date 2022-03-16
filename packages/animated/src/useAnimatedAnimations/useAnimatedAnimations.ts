import { useMemo } from 'react';

import type {
  AnimatedAnimations,
  AnimatedAnimationsCreator,
  AnimatedAnimationsCreatorFunction
} from '../types';
import { ANIMATED_ANIMATIONS_EMPTY } from '../constants';

const useAnimatedAnimations = <P = undefined>(
  animationsList: [
    AnimatedAnimationsCreatorFunction<P>,
    AnimatedAnimationsCreator<P>
  ],
  props: P,
  dependencies: unknown[]
): AnimatedAnimations => {
  const [createBaseAnimatedAnimations, createUserAnimatedAnimations] = animationsList;

  const createUserAnimatedAnimationsType = typeof createUserAnimatedAnimations === 'boolean'
    ? 'boolean'
    : typeof (createUserAnimatedAnimations || undefined);

  return useMemo(() => {
    if (createUserAnimatedAnimations === false) {
      return ANIMATED_ANIMATIONS_EMPTY;
    }

    if (createUserAnimatedAnimations) {
      const userAnimatedAnimations = typeof createUserAnimatedAnimations === 'function'
        ? createUserAnimatedAnimations(props)
        : createUserAnimatedAnimations;

      return {
        ...createBaseAnimatedAnimations(props),
        ...userAnimatedAnimations
      };
    }

    return createBaseAnimatedAnimations(props);
  }, [createUserAnimatedAnimationsType, ...dependencies]);
};

export { useAnimatedAnimations };
