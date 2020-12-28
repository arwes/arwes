import { useContext } from 'react';

import { BleepsSetup } from '../constants';
import { BleepsContext } from '../BleepsContext';

function useBleeps (): BleepsSetup | undefined {
  return useContext(BleepsContext);
}

export { useBleeps };
