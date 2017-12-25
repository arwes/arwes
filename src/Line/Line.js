import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';

export default function Line (props) {

  const {
    theme,
    classes,
    Animation,
    animation,
    animate,
    show,
    layer,
    className,
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
        <div className={cx(cls, classes[anim.status])} {...etc}>
          <div className={classes.line} />
          <div className={classes.left} />
          <div className={classes.right} />
        </div>
      )}
    </Animation>
  );
}

Line.propTypes = {
  Animation: PropTypes.any.isRequired,

  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,

  animate: PropTypes.bool,
  show: PropTypes.bool,
  animation: PropTypes.object,

  layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),
};

Line.defaultProps = {
  Animation: AnimationComponent,
  show: true,
  layer: 'primary',
};
