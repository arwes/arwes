import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Link (props) {
  const { theme, classes, className, children, ...etc } = props;
  const cls = cx(classes.root, className);
  return <a className={cls} {...etc}>{children}</a>;
}

Link.propTypes = {
  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,
};
