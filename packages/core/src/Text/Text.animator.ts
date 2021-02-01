import { AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import {
  TextAnimationRefs,
  startTextAnimation,
  stopTextAnimation
} from './Text.animations';

const useAnimateEntering = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  startTextAnimation(animator, refs, bleeps);
};

const useAnimateExiting = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  startTextAnimation(animator, refs, bleeps);
};

const useAnimateUnmount = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  stopTextAnimation(animator, refs, bleeps);
};

const animator = {
  useAnimateEntering,
  useAnimateExiting,
  useAnimateUnmount
};

export { animator };
