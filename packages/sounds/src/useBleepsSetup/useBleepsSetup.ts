import { useContext } from 'react';

import { BleepsSetup } from '../constants';
import { BleepsContext } from '../BleepsContext';

function useBleepsSetup (): BleepsSetup | undefined {
  return useContext(BleepsContext);
}

export { useBleepsSetup };
