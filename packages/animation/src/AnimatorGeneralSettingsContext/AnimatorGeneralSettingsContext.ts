import { createContext } from 'react';

import { AnimatorGeneralSettings } from '../constants';

const AnimatorGeneralSettingsContext = createContext<AnimatorGeneralSettings | undefined>(undefined);

AnimatorGeneralSettingsContext.displayName = 'AnimatorGeneralSettingsContext';

export { AnimatorGeneralSettingsContext };
