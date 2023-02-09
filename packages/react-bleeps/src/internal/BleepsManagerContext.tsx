import { createContext } from 'react';
import type { BleepsManager } from '@arwes/bleeps';

const BleepsManagerContext = createContext<BleepsManager | null>(null);

export { BleepsManagerContext };
