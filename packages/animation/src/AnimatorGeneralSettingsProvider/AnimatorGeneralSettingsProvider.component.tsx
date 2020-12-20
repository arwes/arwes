import React, { FC, useContext, useMemo } from 'react';

import { AnimatorGeneralSettings } from '../constants';
import { AnimatorGeneralSettingsContext } from '../AnimatorGeneralSettingsContext';

interface AnimatorGeneralSettingsProviderProps {
  animator?: AnimatorGeneralSettings
  children?: any
}

const AnimatorGeneralSettingsProvider: FC<AnimatorGeneralSettingsProviderProps> = props => {
  const { animator: localSettings, children } = props;
  const parentSettings = useContext(AnimatorGeneralSettingsContext);

  const toProvideSettings: AnimatorGeneralSettings | undefined = useMemo(() => {
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
    <AnimatorGeneralSettingsContext.Provider value={toProvideSettings}>
      {children}
    </AnimatorGeneralSettingsContext.Provider>
  );
};

AnimatorGeneralSettingsProvider.displayName = 'AnimatorGeneralSettingsProvider';

export { AnimatorGeneralSettingsProviderProps, AnimatorGeneralSettingsProvider };
