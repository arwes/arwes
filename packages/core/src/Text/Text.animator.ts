import { AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import {
  TextAnimationRefs,
  startTextAnimation,
  stopTextAnimation
} from '../utils/textAnimations';

const useAnimateEntering = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps.type?.play();
  startTextAnimation(animator, refs);
};

const useAnimateEntered = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps.type?.stop();
};

const useAnimateExiting = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps.type?.play();
  startTextAnimation(animator, refs);
};

const useAnimateExited = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps.type?.stop();
};

const useAnimateUnmount = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  stopTextAnimation(animator, refs);
  bleeps.type?.stop();
};

const animator = {
  useAnimateEntering,
  useAnimateEntered,
  useAnimateExiting,
  useAnimateExited,
  useAnimateUnmount
};

export { animator };
