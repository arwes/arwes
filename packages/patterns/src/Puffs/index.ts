import { memo } from 'react';

import { PuffsComponent } from './Puffs.component';

const Puffs: typeof PuffsComponent = memo(PuffsComponent) as any;

export * from './Puffs.types';
export { Puffs };
