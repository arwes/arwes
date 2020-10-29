import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AnimationContext } from '../AnimationContext';

function Component (props) {
  const parentContext = useContext(AnimationContext);
  const settings = { ...parentContext };

  if (Object.prototype.hasOwnProperty.call(props, 'animate')) {
    settings.animate = props.animate;
  }

  if (Object.prototype.hasOwnProperty.call(props, 'duration')) {
    if (typeof props.duration === 'number') {
      settings.duration = {
        ...settings.duration,
        enter: props.duration,
        exit: props.duration
      };
    }
    else {
      settings.duration = {
        ...settings.duration,
        ...props.duration
      };
    }
  }

  return (
    <AnimationContext.Provider value={settings}>
      {props.children}
    </AnimationContext.Provider>
  );
}

Component.propTypes = {
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
  ]),
  children: PropTypes.any
};

export { Component };
