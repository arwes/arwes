import { AnimatorRef } from '@arwes/animation';

import { startAnimation, stopAnimation } from './Text.animations';

const useAnimateEntering = (animator: AnimatorRef, refs: any): void => {
  startAnimation(animator, refs);
};

const useAnimateExiting = (animator: AnimatorRef, refs: any): void => {
  startAnimation(animator, refs);
};

const useAnimateUnmount = (animator: AnimatorRef, refs: any): void => {
  stopAnimation(animator, refs);
};

export {
  useAnimateEntering,
  useAnimateExiting,
  useAnimateUnmount
};
