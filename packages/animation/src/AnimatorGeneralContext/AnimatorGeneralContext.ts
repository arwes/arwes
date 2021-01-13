import { createContext } from 'react';

import { AnimatorGeneralProviderRef } from '../constants';

const AnimatorGeneralContext = createContext<AnimatorGeneralProviderRef | undefined>(undefined);

AnimatorGeneralContext.displayName = 'AnimatorGeneralContext';

export { AnimatorGeneralContext };
