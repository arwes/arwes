import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';

export default function Footer (props) {

  const {
    theme,
    classes,
    Animation,
    animate,
    show,
    className,
    children,
    ...etc
  } = props;
  const cls = cx(classes.root, className);

  return (
    <Animation animate={animate} show={show} timeout={theme.animTime}>
      {anim => (
        <div className={cx(cls, classes[anim.status])} {...etc}>
          <div className={classes.separator} />
          <div className={classes.children}>{children}</div>
        </div>
      )}
    </Animation>
  );
}

Footer.propTypes = {
  Animation: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  animate: PropTypes.bool,
  show: PropTypes.bool,
};

Footer.defaultProps = {
  Animation: AnimationComponent,
  animate: false,
  show: true,
};
