import { useContext } from 'react';

import type { BleepsSetup } from '../types';
import { BleepsContext } from '../BleepsContext';

function useBleepsSetup (): BleepsSetup | undefined {
  return useContext(BleepsContext);
}

export { useBleepsSetup };
