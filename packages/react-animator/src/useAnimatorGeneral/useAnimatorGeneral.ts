import { useContext } from 'react';

import type { AnimatorGeneralInterface } from '../types';
import { AnimatorGeneralContext } from '../internal/AnimatorGeneralContext/index';

const useAnimatorGeneral = (): AnimatorGeneralInterface | undefined => {
  return useContext(AnimatorGeneralContext);
};

export { useAnimatorGeneral };
