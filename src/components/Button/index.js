import React, { PropTypes } from 'react';
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
