import React, { FC, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { AnimatorGeneralProviderSettings, AnimatorGeneralProviderRef } from '../constants';
import { AnimatorGeneralContext } from '../AnimatorGeneralContext';

interface AnimatorGeneralProviderProps {
  animator?: AnimatorGeneralProviderSettings
  children?: any
}

const AnimatorGeneralProvider: FC<AnimatorGeneralProviderProps> = props => {
  const { animator: localSettings, children } = props;
  const parentSettings = useContext(AnimatorGeneralContext);

  const toProvideSettings: AnimatorGeneralProviderRef | undefined = useMemo(() => {
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

AnimatorGeneralProvider.propTypes = {
  // @ts-expect-error
  animator: PropTypes.shape({
    duration: PropTypes.shape({
      enter: PropTypes.number,
      exit: PropTypes.number,
      stagger: PropTypes.number,
      delay: PropTypes.number,
      offset: PropTypes.number
    })
  }),
  children: PropTypes.any
};

export { AnimatorGeneralProviderProps, AnimatorGeneralProvider };
