import { createContext } from 'react';

import { AnimatorProvidedSettings } from '../constants';

const AnimatorContext = createContext<AnimatorProvidedSettings | undefined>(undefined);

AnimatorContext.displayName = 'AnimatorContext';

export { AnimatorContext };
