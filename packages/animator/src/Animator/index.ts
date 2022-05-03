import { memo } from 'react';

import { Animator as AnimatorComponent } from './Animator';

// TODO: Optimize props comparision.
const Animator: typeof AnimatorComponent = memo(AnimatorComponent) as any;

export * from './Animator';
export { Animator };
