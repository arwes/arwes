import { AnimatorRef, AnimatorClassSettings } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import {
  TextAnimationRefs,
  startTextAnimation,
  stopTextAnimation
} from '../utils/textAnimations';

const onAnimateEntering = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps.type?.play();
  startTextAnimation(animator, refs);
};

const onAnimateEntered = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps.type?.stop();
};

const onAnimateExiting = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps.type?.play();
  startTextAnimation(animator, refs);
};

const onAnimateExited = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  bleeps.type?.stop();
};

const onAnimateUnmount = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  stopTextAnimation(animator, refs);
  bleeps.type?.stop();
};

const animator: AnimatorClassSettings = {
  onAnimateEntering,
  onAnimateEntered,
  onAnimateExiting,
  onAnimateExited,
  onAnimateUnmount
};

export { animator };
