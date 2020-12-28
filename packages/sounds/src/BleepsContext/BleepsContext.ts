import { createContext } from 'react';

import { BleepsSetup } from '../constants';

const BleepsContext = createContext<BleepsSetup | undefined>(undefined);

BleepsContext.displayName = 'BleepsContext';

export { BleepsContext };
