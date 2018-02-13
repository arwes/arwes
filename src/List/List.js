import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function List (props) {
  const { theme, classes, node, className, children, ...etc } = props;
  const cls = cx(classes.root, className);
  return React.createElement(node, { className: cls, ...etc }, children);
}

List.propTypes = {
  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,

  /**
   * The list node type, e.g. ul.
   */
  node: PropTypes.oneOf(['ul', 'ol', 'dl']),
};

List.defaultProps = {
  node: 'ul',
};
