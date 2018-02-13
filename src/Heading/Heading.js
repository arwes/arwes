import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Heading (props) {
  const { theme, classes, node, className, children, ...etc } = props;
  const cls = cx(classes.root, className);
  return React.createElement(node, { className: cls, ...etc }, children);
}

Heading.propTypes = {
  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,

  /**
   * The heading node e.g. h1, h2...
   */
  node: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
};

Heading.defaultProps = {
  node: 'h1',
};
