import { IS_BROWSER } from '@arwes/tools';
import type {
  Bleep,
  BleepGeneralProps,
  BleepsManagerPropsUpdatable,
  BleepsManager,
  BleepsManagerProps
} from '../types';
import { createBleep } from '../createBleep/index';

const createBleepsManager = <Names extends string>(
  props: BleepsManagerProps<Names>
): BleepsManager<Names> => {
  // In non-browser environments, the bleeps manager is still created but without
  // actual functionalities.
  const isBleepsAvailable = IS_BROWSER && !!window.AudioContext;
  const context = isBleepsAvailable ? new window.AudioContext() : null as unknown as AudioContext;
  const masterGain = isBleepsAvailable ? context.createGain() : null as unknown as GainNode;

  const bleeps = {} as unknown as Record<Names, Bleep | null>;
  const bleepNames = Object.keys(props.bleeps) as Names[];

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
        masterGain
      });
  });

  if (isBleepsAvailable) {
    masterGain.connect(context.destination);

    // Set initial master gain value.
    const globalVolume = Math.max(0, Math.min(1, props?.master?.volume ?? 1));
    masterGain.gain.setValueAtTime(globalVolume, context.currentTime);
  }

  const unload = (): void => {
    if (!isBleepsAvailable) {
      return;
    }

    bleepNames.forEach(bleepName => {
      bleeps[bleepName]?.unload();
    });
  };

  const update = (newProps: BleepsManagerPropsUpdatable): void => {
    if (!isBleepsAvailable) {
      return;
    }

    // Global settings.

    if (newProps.master?.volume !== undefined) {
      const globalVolume = Math.max(0, Math.min(1, newProps.master.volume));
      masterGain.gain.setValueAtTime(globalVolume, context.currentTime);
    }

    // Bleep settings.

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
        if (bleeps[bleepName]) {
          bleeps[bleepName]?.update({
            ...generalProps,
            ...newProps.bleeps?.[bleepName]
          });
        }
        else {
          bleeps[bleepName] = createBleep({
            ...generalProps,
            ...baseBleepProps,
            context,
            masterGain
          });
        }
      }
    });
  };

  return Object.freeze({ bleeps, unload, update });
};

export { createBleepsManager };
