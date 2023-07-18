import type { ReactNode, ReactElement } from 'react';
import React, { useMemo, useEffect } from 'react';
import type { BleepsManagerProps } from '@arwes/bleeps';
import { createBleepsManager } from '@arwes/bleeps';

import { BleepsManagerContext } from '../internal/BleepsManagerContext';

interface BleepsProviderSettings <BleepsNames extends string = string> extends BleepsManagerProps<BleepsNames> {}

interface BleepsProviderProps <BleepsNames extends string = string> extends BleepsProviderSettings<BleepsNames> {
  children: ReactNode
}

const BleepsProvider = <BleepsNames extends string = string>(props: BleepsProviderProps<BleepsNames>): ReactElement => {
  const { master, common, categories, bleeps, children } = props;

  // The bleeps is created once with the provided bleep names.
  const bleepsManager = useMemo(
    () => createBleepsManager({ master, common, categories, bleeps }),
    []
  );

  useEffect(() => {
    bleepsManager?.update({ master, common, categories, bleeps });
  }, [master, common, categories, bleeps]);

  useEffect(() => {
    return () => {
      bleepsManager?.unload();
    };
  }, []);

  return (
    <BleepsManagerContext.Provider value={bleepsManager}>
      {children}
    </BleepsManagerContext.Provider>
  );
};

export type { BleepsProviderSettings, BleepsProviderProps };
export { BleepsProvider };
