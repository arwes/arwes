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

const useAnimateEntering = (animator: AnimatorRef, bleeps: Bleeps): void => {
  playTableTransitionBleep(bleeps);
};

const useAnimateEntered = (animator: AnimatorRef, bleeps: Bleeps): void => {
  stopTableTransitionBleep(bleeps);
};

const useAnimateExiting = (animator: AnimatorRef, bleeps: Bleeps): void => {
  playTableTransitionBleep(bleeps);
};

const useAnimateExited = (animator: AnimatorRef, bleeps: Bleeps): void => {
  stopTableTransitionBleep(bleeps);
};

const useAnimateUnmount = (animator: AnimatorRef, bleeps: Bleeps): void => {
  stopTableTransitionBleep(bleeps);
};

const animator: AnimatorClassSettings = {
  combine: true,
  manager: 'stagger',
  useAnimateEntering,
  useAnimateEntered,
  useAnimateExiting,
  useAnimateExited,
  useAnimateUnmount
};

export { animator };
