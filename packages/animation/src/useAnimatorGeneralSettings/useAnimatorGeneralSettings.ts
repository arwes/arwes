import { useContext } from 'react';

import { AnimatorGeneralSettings } from '../constants';
import { AnimatorGeneralSettingsContext } from '../AnimatorGeneralSettingsContext';

function useAnimatorGeneralSettings (): AnimatorGeneralSettings | undefined {
  return useContext(AnimatorGeneralSettingsContext);
}

export { useAnimatorGeneralSettings };
