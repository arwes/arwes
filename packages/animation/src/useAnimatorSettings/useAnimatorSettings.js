import { useContext } from 'react';

import { AnimatorSettingsContext } from '../AnimatorSettingsContext';

function useAnimatorSettings () {
  return useContext(AnimatorSettingsContext);
}

export { useAnimatorSettings };
