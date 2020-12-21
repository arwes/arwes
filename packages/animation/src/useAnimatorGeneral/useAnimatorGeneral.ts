import { useContext } from 'react';

import { AnimatorGeneralProviderSettings } from '../constants';
import { AnimatorGeneralContext } from '../AnimatorGeneralContext';

function useAnimatorGeneral (): AnimatorGeneralProviderSettings | undefined {
  return useContext(AnimatorGeneralContext);
}

export { useAnimatorGeneral };
