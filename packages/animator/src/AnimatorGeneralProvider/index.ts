import { memo } from 'react';

import { AnimatorGeneralProvider as Component } from './AnimatorGeneralProvider';

// TODO: Optimize props comparision.
const AnimatorGeneralProvider = memo(Component);

export * from './AnimatorGeneralProvider';
export { AnimatorGeneralProvider };
