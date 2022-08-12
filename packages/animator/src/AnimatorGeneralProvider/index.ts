import { memo } from '@arwes/tools';
import { AnimatorGeneralProvider as Component } from './AnimatorGeneralProvider';

// TODO: Optimize props comparision.
const AnimatorGeneralProvider = memo(Component);

export * from './AnimatorGeneralProvider.types';
export { AnimatorGeneralProvider };
