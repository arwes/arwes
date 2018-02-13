import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Blockquote (props) {
  const { theme, classes, layer, className, children, ...etc } = props;
  const cls = cx(classes.root, className);
  return (
    <blockquote className={cls} data-layer={layer} {...etc}>
      {children}
    </blockquote>
  );
}

Blockquote.propTypes = {
  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,
  layer: PropTypes.oneOf(['', 'success', 'alert', 'disabled']),
};
