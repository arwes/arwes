import { IS_BROWSER, IS_PRODUCTION } from '@arwes/tools';

import type { Bleep, BleepsManager, BleepsManagerProps } from '../types';
import { createBleep } from '../createBleep/index';

const createBleepsManager = <BleepNames extends string = string>(
  props: BleepsManagerProps<BleepNames>
): BleepsManager<BleepNames> | null => {
  if (!IS_BROWSER) {
    return null;
  }

  // TODO: Add support for Safari browser.
  const isSafari = (/safari/i).test(window.navigator.userAgent);
  const isSupported = isSafari;
  if (!isSupported) {
    if (!IS_PRODUCTION) {
      console.error('Bleeps are not supported in this navigator.');
    }
    return null;
  }

  const context = new AudioContext();
  const bleeps = {} as unknown as Record<BleepNames, Bleep | null>;
  const bleepNames = Object.keys(props.bleeps) as BleepNames[];

  bleepNames.forEach(bleepName => {
    const bleepProps = props.bleeps[bleepName];
    const categoryProps = bleepProps.category
      ? props.categories?.[bleepProps.category]
      : null;

    bleeps[bleepName] = createBleep({
      ...props.common,
      ...categoryProps,
      ...bleepProps,
      context
    });
  });

  const update = (): void => {
    // TODO: Implement.
  };

  return Object.freeze({ bleeps, update });
};

export { createBleepsManager };
