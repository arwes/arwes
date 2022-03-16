import { createContext } from 'react';

import type { BleepsSetup } from '../types';

const BleepsContext = createContext<BleepsSetup | undefined>(undefined);

BleepsContext.displayName = 'BleepsContext';

export { BleepsContext };
