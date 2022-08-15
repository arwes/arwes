import { memo } from '@arwes/tools';
import { Puffs as PuffsComponent } from './Puffs';

const Puffs = memo(PuffsComponent);

export * from './Puffs.types';
export { Puffs };
