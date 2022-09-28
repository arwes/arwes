import { memo } from '@arwes/react-tools';
import { Animator as Component } from './Animator';

// TODO: Optimize props comparision.
const Animator = memo(Component);

export * from './Animator.types';
export { Animator };
