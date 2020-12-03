import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { AnimationContext } from '../AnimationContext';

function mergeSettings (localSettings, parentSettings) {
  if (!localSettings) {
    return parentSettings;
  }

  const settings = parentSettings ? { ...parentSettings } : {};

  if (Object.prototype.hasOwnProperty.call(localSettings, 'animate')) {
    settings.animate = localSettings.animate;
  }

  if (Object.prototype.hasOwnProperty.call(localSettings, 'duration')) {
    if (typeof localSettings.duration === 'number') {
      settings.duration = {
        ...settings.duration,
        enter: localSettings.duration,
        exit: localSettings.duration
      };
    }
    else {
      settings.duration = {
        ...settings.duration,
        ...localSettings.duration
      };
    }
  }

  return settings;
}

function Component (props) {
  const { animation: localSettings } = props;
  const parentSettings = useContext(AnimationContext);

  const settings = useMemo(
    () => mergeSettings(localSettings, parentSettings),
    [localSettings, parentSettings]
  );

  return (
    <AnimationContext.Provider value={settings}>
      {props.children}
    </AnimationContext.Provider>
  );
}

Component.propTypes = {
  animation: PropTypes.shape({
    animate: PropTypes.bool,
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
