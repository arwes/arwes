import { memo } from 'react';

import { DotsComponent } from './Dots.component';

const Dots: typeof DotsComponent = memo(DotsComponent) as any;

export * from './Dots.types';
export { Dots };
