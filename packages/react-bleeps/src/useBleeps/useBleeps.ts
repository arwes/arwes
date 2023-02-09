import { useContext } from 'react';
import type { BleepsManager } from '@arwes/bleeps';

import { BleepsManagerContext } from '../internal/BleepsManagerContext';

const useBleeps = <
  BleepsNames extends string,
  Manager extends BleepsManager = BleepsManager<BleepsNames>
>(): Manager['bleeps'] => {
  const bleepsManager = useContext(BleepsManagerContext);
  return bleepsManager?.bleeps ?? {};
};

export { useBleeps };
