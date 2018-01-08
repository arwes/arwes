import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';

export default function Appear (props) {

  const {
    theme,
    classes,
    Animation,
    animation,
    animate,
    show,
    className,
    children,
    ...etc
  } = props;
  const cls = cx(classes.root, className);

  return (
    <Animation
      animate={animate}
      show={show}
      timeout={theme.animTime}
      {...animation}
    >
      {anim => (
      <span className={cx(cls, classes[anim.status])} {...etc}>
        {children}
      </span>
      )}
    </Animation>
  );
}

Appear.propTypes = {
  Animation: PropTypes.any.isRequired,

  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,

  animate: PropTypes.bool,
  show: PropTypes.bool,
  animation: PropTypes.object,
};

Appear.defaultProps = {
  Animation: AnimationComponent,
  show: true,
};
