import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

const duration = { enter: 0, exit: 0 };
const manager = 'stagger';

const useAnimateEntering = (animator: AnimatorRef, bleeps: Bleeps): void => {
  bleeps.readout?.play();

  // TODO: DEBUG:
  setTimeout(() => {
    bleeps.readout?.stop();
  }, 11 * 50);
};

const useAnimateExiting = (animator: AnimatorRef, bleeps: Bleeps): void => {
  bleeps.readout?.play();

  // TODO: DEBUG:
  setTimeout(() => {
    bleeps.readout?.stop();
  }, 11 * 50);
};

const useAnimateUnmount = (animator: AnimatorRef, bleeps: Bleeps): void => {
  if (bleeps.readout?.getIsPlaying()) {
    bleeps.readout?.stop();
  }
};

const animator: AnimatorClassSettings = {
  duration,
  manager,
  useAnimateEntering,
  useAnimateExiting,
  useAnimateUnmount
};

export { animator };
