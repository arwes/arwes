import { useContext } from 'react';

import type { BleepsSetup } from '../types';
import { BleepsContext } from '../BleepsContext/index';

function useBleepsSetup (): BleepsSetup | undefined {
  return useContext(BleepsContext);
}

export { useBleepsSetup };
