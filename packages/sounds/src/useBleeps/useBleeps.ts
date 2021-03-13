import { useContext } from 'react';

import { Bleeps } from '../constants';
import { BleepsContext } from '../BleepsContext';

function useBleeps (): Bleeps {
  const bleepsSetup = useContext(BleepsContext);
  return bleepsSetup?.bleeps || {};
}

export { useBleeps };
