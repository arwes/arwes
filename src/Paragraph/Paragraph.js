import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Paragraph (props) {
  const { theme, classes, className, children, ...etc } = props;
  const cls = cx(classes.root, className);
  return <p className={cls} {...etc}>{children}</p>;
}

Paragraph.propTypes = {
  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,
};
