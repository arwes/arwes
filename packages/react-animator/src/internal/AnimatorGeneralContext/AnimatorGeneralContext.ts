import { createContext } from 'react';

import type { AnimatorGeneralInterface } from '../../types';

const AnimatorGeneralContext = createContext<AnimatorGeneralInterface | undefined>(undefined);

export { AnimatorGeneralContext };
