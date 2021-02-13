/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ComponentType, createElement, forwardRef, useMemo, useEffect } from 'react';

import { BleepsSettings, Bleeps } from '../constants';
import { createOrUpdateBleeps } from '../utils/createOrUpdateBleeps';
import { unloadBleeps } from '../utils/unloadBleeps';
import { useBleepsSetup } from '../useBleepsSetup';

interface WithBleepsInputProps {
  bleeps: Bleeps
}

interface WithBleepsOutputProps {
  bleeps?: BleepsSettings
}

const withBleeps = <C extends ComponentType<P>, P extends WithBleepsInputProps = WithBleepsInputProps>(classBleepsSettings: BleepsSettings) => {
  type T = Pick<P, Exclude<keyof P, keyof WithBleepsInputProps>> & WithBleepsOutputProps;

  // The total number of instances of this component.
  let componentInstances = 0;

  // Shared list of component instances bleeps.
  let bleeps: Bleeps | undefined;

  const withBleepsWrapped = (InputComponent: ComponentType<P>) => {
    const OutputComponent = forwardRef<C, T>((props, ref) => {
      const { bleeps: instanceBleepsSettings, ...otherProps } = props;

      const bleepsSetup = useBleepsSetup();

      if (!bleepsSetup) {
        throw new Error('Component with bleeps requires <BleepsProvider/> settings.');
      }

      bleeps = useMemo(() => {
        return createOrUpdateBleeps(bleeps, bleepsSetup, {
          ...classBleepsSettings,
          ...instanceBleepsSettings
        });
      }, [bleepsSetup, instanceBleepsSettings]);

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
        ...(otherProps as any),
        bleeps,
        ref
      });
    });

    const componentName = InputComponent.displayName || InputComponent.name || 'Component';
    OutputComponent.displayName = `withBleeps(${componentName})`;

    return OutputComponent;
  };

  return withBleepsWrapped;
};

export { WithBleepsInputProps, WithBleepsOutputProps, withBleeps };
