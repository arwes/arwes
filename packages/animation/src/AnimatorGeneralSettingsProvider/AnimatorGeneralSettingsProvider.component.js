import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { expandAnimatorDuration } from '../utils/expandAnimatorDuration';
import { AnimatorGeneralSettingsContext } from '../AnimatorGeneralSettingsContext';

function Component (props) {
  const { animator: localSettings, children } = props;
  const parentSettings = useContext(AnimatorGeneralSettingsContext);

  const toProvideSettings = useMemo(() => {
    if (!localSettings) {
      return parentSettings;
    }

    return {
      ...parentSettings,
      duration: {
        ...parentSettings?.duration,
        ...expandAnimatorDuration(localSettings.duration)
      }
    };
  }, [localSettings, parentSettings]);

  return (
    <AnimatorGeneralSettingsContext.Provider value={toProvideSettings}>
      {children}
    </AnimatorGeneralSettingsContext.Provider>
  );
}

Component.displayName = 'AnimatorGeneralSettingsProvider';

Component.propTypes = {
  animator: PropTypes.shape({
    duration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number,
        stagger: PropTypes.number,
        delay: PropTypes.number,
        offset: PropTypes.number
      })
    ])
  }),
  children: PropTypes.any
};

export { Component };
