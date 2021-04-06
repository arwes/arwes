import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

const playTableTransitionBleep = (bleeps: Bleeps): void => {
  bleeps.readout?.play();
};

const stopTableTransitionBleep = (bleeps: Bleeps): void => {
  if (bleeps.readout?.getIsPlaying()) {
    bleeps.readout?.stop();
  }
};

const onAnimateEntering = (animator: AnimatorRef, bleeps: Bleeps): void => {
  playTableTransitionBleep(bleeps);
};

const onAnimateEntered = (animator: AnimatorRef, bleeps: Bleeps): void => {
  stopTableTransitionBleep(bleeps);
};

const onAnimateExiting = (animator: AnimatorRef, bleeps: Bleeps): void => {
  playTableTransitionBleep(bleeps);
};

const onAnimateExited = (animator: AnimatorRef, bleeps: Bleeps): void => {
  stopTableTransitionBleep(bleeps);
};

const onAnimateUnmount = (animator: AnimatorRef, bleeps: Bleeps): void => {
  stopTableTransitionBleep(bleeps);
};

const animator: AnimatorClassSettings = {
  combine: true,
  manager: 'stagger',
  onAnimateEntering,
  onAnimateEntered,
  onAnimateExiting,
  onAnimateExited,
  onAnimateUnmount
};

export { animator };
