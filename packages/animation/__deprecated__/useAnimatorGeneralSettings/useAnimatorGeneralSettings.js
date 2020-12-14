import { useContext } from 'react';

import { AnimatorGeneralSettingsContext } from '../AnimatorGeneralSettingsContext';

function useAnimatorGeneralSettings () {
  return useContext(AnimatorGeneralSettingsContext);
}

export { useAnimatorGeneralSettings };
