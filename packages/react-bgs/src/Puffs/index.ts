import { memo } from '@arwes/react-tools';
import { Puffs as PuffsComponent } from './Puffs';

const Puffs = memo(PuffsComponent);

export * from './Puffs.types';
export { Puffs };
