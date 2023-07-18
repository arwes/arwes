import type {
  Bleep,
  BleepGeneralProps,
  BleepsManagerPropsUpdatable,
  BleepsManager,
  BleepsManagerProps
} from '../types';
import { IS_BLEEPS_AVAILABLE } from '../constants';
import { createBleep } from '../createBleep/index';

const createBleepsManager = <Names extends string>(
  props: BleepsManagerProps<Names>
): BleepsManager<Names> => {
  // In non-browser environments, the bleeps manager is still created but without
  // actual functionalities.
  const context = IS_BLEEPS_AVAILABLE ? new window.AudioContext() : null as unknown as AudioContext;
  const masterGain = IS_BLEEPS_AVAILABLE ? context.createGain() : null as unknown as GainNode;

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

  if (IS_BLEEPS_AVAILABLE) {
    masterGain.connect(context.destination);

    // Set initial master gain value.
    const globalVolume = Math.max(0, Math.min(1, props?.master?.volume ?? 1));
    masterGain.gain.setValueAtTime(globalVolume, context.currentTime);
  }

  const unload = (): void => {
    bleepNames.forEach(bleepName => {
      bleeps[bleepName]?.unload();
    });
  };

  const update = (newProps: BleepsManagerPropsUpdatable): void => {
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
