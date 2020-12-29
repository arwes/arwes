/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ComponentType, createElement, forwardRef, useMemo, useEffect } from 'react';

import { BleepsSettings, Bleeps } from '../constants';
import { createOrUpdateBleeps } from '../utils/createOrUpdateBleeps';
import { unloadBleeps } from '../utils/unloadBleeps';
import { useBleepsSetup } from '../useBleepsSetup';

interface WithBleepsOutputProps {
  bleeps: Bleeps
}

const withBleeps = <C extends ComponentType<P>, P extends WithBleepsOutputProps = WithBleepsOutputProps>(bleepsSettings: BleepsSettings) => {
  type T = Pick<P, Exclude<keyof P, keyof WithBleepsOutputProps>>;

  // The total number of instances of this component.
  let componentInstances = 0;

  // Shared list of component instances bleeps.
  let bleeps: Bleeps | undefined;

  const withBleepsWrapped = (InputComponent: ComponentType<P>) => {
    const WithBleeps = forwardRef<C, T>((props, ref) => {
      const bleepsSetup = useBleepsSetup();

      if (!bleepsSetup) {
        throw new Error('Component with bleeps requires <BleepsProvider/> settings.');
      }

      bleeps = useMemo(
        () => createOrUpdateBleeps(bleeps, bleepsSetup, bleepsSettings),
        [bleepsSetup]
      );

      useEffect(() => {
        componentInstances++;

        return () => {
          componentInstances--;

          if (componentInstances === 0 && bleeps) {
            unloadBleeps(bleeps);
            bleeps = undefined;
          }
        };
      }, []);

      return createElement(InputComponent, {
        ...(props as P),
        bleeps,
        ref
      });
    });

    return WithBleeps;
  };

  return withBleepsWrapped;
};

export { WithBleepsOutputProps, withBleeps };
