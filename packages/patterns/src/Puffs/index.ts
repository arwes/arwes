import { memo } from 'react';

import { Puffs as PuffsComponent } from './Puffs.component';

const Puffs: typeof PuffsComponent = memo(PuffsComponent) as any;

export * from './Puffs.types';
export { Puffs };
