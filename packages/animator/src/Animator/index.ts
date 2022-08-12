import { memo } from 'react';

import { Animator as Component } from './Animator';

// TODO: Optimize props comparision.
const Animator: typeof Component = memo(Component) as any;

export * from './Animator.types';
export { Animator };
