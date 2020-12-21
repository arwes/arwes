import React, { FC, useContext, useMemo } from 'react';

import { AnimatorGeneralProviderSettings, AnimatorGeneralProviderProvidedSettings } from '../constants';
import { AnimatorGeneralContext } from '../AnimatorGeneralContext';

interface AnimatorGeneralProviderProps {
  animator?: AnimatorGeneralProviderSettings
  children?: any
}

const AnimatorGeneralProvider: FC<AnimatorGeneralProviderProps> = props => {
  const { animator: localSettings, children } = props;
  const parentSettings = useContext(AnimatorGeneralContext);

  const toProvideSettings: AnimatorGeneralProviderProvidedSettings | undefined = useMemo(() => {
    if (!localSettings) {
      return parentSettings;
    }

    const settings = {
      ...parentSettings,
      ...localSettings
    };

    if (localSettings.duration) {
      settings.duration = {
        ...parentSettings?.duration,
        ...localSettings?.duration
      };
    }

    return settings;
  }, [localSettings, parentSettings]);

  return (
    <AnimatorGeneralContext.Provider value={toProvideSettings}>
      {children}
    </AnimatorGeneralContext.Provider>
  );
};

export { AnimatorGeneralProviderProps, AnimatorGeneralProvider };
