import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Button (props) {

  const { className, children, ...rest } = props;
  const cls = classNames('arwes-button', className);

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any
};

Button.defaultProps = {
  //
};
