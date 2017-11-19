import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Animation from '../Animation';

export default function Frame (props) {

  const {
    theme,
    classes,
    animate,
    show,
    layer,
    level,
    corners,
    disabled,
    hover,
    className,
    children,
    ...etc
  } = props;

  const cls = cx(classes.root, {
    [classes.hover]: !disabled && hover,
  }, className);

  return (
    <Animation show={show} animate={!disabled && animate} timeout={theme.animTime}>
      {anim => (
      <div className={cx(cls, classes[anim.status])} {...etc}>

        <div className={cx(classes.border, classes.borderLeft)} />
        <div className={cx(classes.border, classes.borderRight)} />
        <div className={cx(classes.border, classes.borderTop)} />
        <div className={cx(classes.border, classes.borderBottom)} />

        { !!corners && <div className={cx(classes.corner, classes.cornerLT)} />}
        { !!corners && <div className={cx(classes.corner, classes.cornerLB)} />}
        { !!corners && <div className={cx(classes.corner, classes.cornerRT)} />}
        { !!corners && <div className={cx(classes.corner, classes.cornerRB)} />}

        <div className={classes.box}>
          <div className={classes.children}>
            {children}
          </div>
        </div>
      </div>
      )}
    </Animation>
  );
}

Frame.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  animate: PropTypes.bool,
  show: PropTypes.bool,
  layer: PropTypes.oneOf(['primary', 'success', 'alert', 'disabled']),
  level: PropTypes.oneOf([0, 1, 2, 3]),
  corners: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  disabled: PropTypes.bool,
  hover: PropTypes.bool,
};

Frame.defaultProps = {
  animate: false,
  show: true,
  layer: 'primary',
  level: 0,
  corners: 0,
  disabled: false,
  hover: false,
};
