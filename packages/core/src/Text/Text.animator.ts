import { AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import {
  TextAnimationRefs,
  startTextAnimation,
  stopTextAnimation
} from '../utils/textAnimations';

const useAnimateEntering = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  startTextAnimation(animator, refs, bleeps);
};

const useAnimateEntered = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps?.typing.stop();
};

const useAnimateExiting = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  startTextAnimation(animator, refs, bleeps);
};

const useAnimateExited = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps?.typing.stop();
};

const useAnimateUnmount = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  stopTextAnimation(animator, refs, bleeps);
};

const animator = {
  useAnimateEntering,
  useAnimateEntered,
  useAnimateExiting,
  useAnimateExited,
  useAnimateUnmount
};

export { animator };
