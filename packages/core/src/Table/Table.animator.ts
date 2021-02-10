import { AnimatorClassSettings, AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

const playBleepReadout = (bleeps: Bleeps): void => {
  bleeps.readout?.play();
};

const stopBleepReadout = (bleeps: Bleeps): void => {
  if (bleeps.readout?.getIsPlaying()) {
    bleeps.readout?.stop();
  }
};

const useAnimateEntering = (animator: AnimatorRef, bleeps: Bleeps): void => {
  playBleepReadout(bleeps);
};

const useAnimateEntered = (animator: AnimatorRef, bleeps: Bleeps): void => {
  stopBleepReadout(bleeps);
};

const useAnimateExiting = (animator: AnimatorRef, bleeps: Bleeps): void => {
  playBleepReadout(bleeps);
};

const useAnimateExited = (animator: AnimatorRef, bleeps: Bleeps): void => {
  stopBleepReadout(bleeps);
};

const useAnimateUnmount = (animator: AnimatorRef, bleeps: Bleeps): void => {
  stopBleepReadout(bleeps);
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
