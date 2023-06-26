import { createContext } from 'react';

import type { AnimatorInterface } from '@arwes/animator';

const AnimatorContext = createContext<AnimatorInterface | undefined>(undefined);

export { AnimatorContext };
