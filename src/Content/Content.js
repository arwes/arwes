import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Content (props) {
  const { theme, classes, className, children, ...etc } = props;
  const cls = cx(classes.root, className);
  return <div className={cls} {...etc}>{children}</div>;
}

Content.propTypes = {
  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,
};
