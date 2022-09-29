import { createContext } from 'react';

import { AnimatorRef } from '../constants';

const AnimatorContext = createContext<AnimatorRef | undefined>(undefined);

AnimatorContext.displayName = 'AnimatorContext';

export { AnimatorContext };
