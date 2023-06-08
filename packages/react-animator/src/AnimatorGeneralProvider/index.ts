import { memo } from '@arwes/react-tools';
import { AnimatorGeneralProvider as Component } from './AnimatorGeneralProvider';

// TODO: Optimize props comparision.
const AnimatorGeneralProvider = memo(Component);

export * from './AnimatorGeneralProvider';
export { AnimatorGeneralProvider };
