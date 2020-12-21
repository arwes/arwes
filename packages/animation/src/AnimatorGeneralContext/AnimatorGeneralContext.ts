import { createContext } from 'react';

import { AnimatorGeneralProviderProvidedSettings } from '../constants';

const AnimatorGeneralContext = createContext<AnimatorGeneralProviderProvidedSettings | undefined>(undefined);

AnimatorGeneralContext.displayName = 'AnimatorGeneralContext';

export { AnimatorGeneralContext };
