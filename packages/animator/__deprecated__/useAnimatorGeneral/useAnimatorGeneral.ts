import { useContext } from 'react';

import { AnimatorGeneralProviderRef } from '../constants';
import { AnimatorGeneralContext } from '../AnimatorGeneralContext';

function useAnimatorGeneral (): AnimatorGeneralProviderRef | undefined {
  return useContext(AnimatorGeneralContext);
}

export { useAnimatorGeneral };
