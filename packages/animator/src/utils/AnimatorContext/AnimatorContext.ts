import { createContext } from 'react';

import type { AnimatorInterface } from '../../types';

const AnimatorContext = createContext<AnimatorInterface | undefined>(undefined);

export { AnimatorContext };
