import { memo } from '@arwes/react-tools';
import { BleepsProvider as Component } from './BleepsProvider';

const BleepsProvider = memo(Component);

export * from './BleepsProvider';
export { BleepsProvider };
