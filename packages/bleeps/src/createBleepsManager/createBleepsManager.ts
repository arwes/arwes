import { IS_BROWSER } from '@arwes/tools';

import type {
  Bleep,
  BleepGeneralProps,
  BleepsManagerPropsUpdatable,
  BleepsManager,
  BleepsManagerProps
} from '../types';
import { createBleep } from '../createBleep/index';

const createBleepsManager = <BleepNames extends string = string>(
  props: BleepsManagerProps<BleepNames>
): BleepsManager<BleepNames> | null => {
  if (!IS_BROWSER) {
    return null;
  }

  const context = new AudioContext();
  const globalGain = context.createGain();
  const bleeps = {} as unknown as Record<BleepNames, Bleep | null>;
  const bleepNames = Object.keys(props.bleeps) as BleepNames[];

  bleepNames.forEach(bleepName => {
    const bleepProps = props.bleeps[bleepName];
    const categoryProps = bleepProps.category
      ? props.categories?.[bleepProps.category]
      : null;

    const generalProps: BleepGeneralProps = {
      ...props.common,
      ...categoryProps
    };

    bleeps[bleepName] = generalProps.disabled
      ? null
      : createBleep({
        ...generalProps,
        ...bleepProps,
        context,
        globalGain
      });
  });

  globalGain.connect(context.destination);

  const globalVolume = Math.max(0, Math.min(1, props?.global?.volume ?? 1));
  globalGain.gain.setValueAtTime(globalVolume, context.currentTime);

  const update = (newProps: BleepsManagerPropsUpdatable): void => {
    // Global settings.

    if (newProps.global?.volume !== undefined) {
      const globalVolume = Math.max(0, Math.min(1, newProps.global.volume));
      globalGain.gain.setValueAtTime(globalVolume, context.currentTime);
    }

    // Bleep settings.

    const bleepNames = Object.keys(newProps.bleeps) as BleepNames[];

    bleepNames.forEach(bleepName => {
      const baseBleepProps = props.bleeps[bleepName];
      const category = baseBleepProps?.category;
      const newCategoryProps = category
        ? newProps.categories?.[category]
        : null;
      const generalProps: BleepGeneralProps = {
        ...newProps.common,
        ...newCategoryProps
      };

      if (generalProps.disabled) {
        bleeps[bleepName]?.unload();
        bleeps[bleepName] = null;
      }
      else {
        bleeps[bleepName]?.update({
          ...generalProps,
          ...newProps.bleeps[bleepName]
        });
      }
    });
  };

  return Object.freeze({ bleeps, update });
};

export { createBleepsManager };
