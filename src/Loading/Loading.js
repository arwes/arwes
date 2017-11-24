import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';

export default function Loading (props) {

  const {
    theme,
    classes,
    Animation,
    animate,
    show,
    layer,
    small,
    full,
    className,
    ...etc
  } = props;
  const cls = cx(classes.root, {
    [classes.isSmall]: small,
    [classes.isFull]: full
  }, className);

  return (
    <Animation animate={animate} show={show} timeout={theme.animTime}>
      {anim => (
        <div className={cx(cls, classes[anim.status])} {...etc}>
          { !small && <div className={cx(classes.circle, classes.circle1)} /> }
          <div className={cx(classes.circle, classes.circle2)} />
        </div>
      )}
    </Animation>
  );
}

Loading.propTypes = {
  Animation: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  animate: PropTypes.bool,
  show: PropTypes.bool,
  layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),

  /**
   * Make the loading a small inline-block element animation to fit
   * inside other components.
   */
  small: PropTypes.bool,

  /**
   * Expand to fill the container space. This assumes there is a positioned
   * parent element to hold the loading.
   */
  full: PropTypes.bool,
};

Loading.defaultProps = {
  Animation: AnimationComponent,
  animate: false,
  show: true,
  layer: 'primary',
  small: false,
  full: false,
};
