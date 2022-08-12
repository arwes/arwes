import { memo } from 'react';

import { Dots as DotsComponent } from './Dots';

const Dots: typeof DotsComponent = memo(DotsComponent) as any;

export * from './Dots.types';
export { Dots };
