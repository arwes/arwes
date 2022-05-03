import { memo } from 'react';

import { Dots as DotsComponent } from './Dots.component';

const Dots: typeof DotsComponent = memo(DotsComponent) as any;

export * from './Dots.types';
export { Dots };
