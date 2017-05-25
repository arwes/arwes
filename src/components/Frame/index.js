import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Frame extends Component {

  constructor () {
    super(...arguments);
  }

  render () {

    const {
      border,
      corners,
      content,
      className,
      children,
      ...rest
    } = this.props;

    const cls = classNames('arwes-frame', {
      'arwes-frame--content': content,
      'arwes-frame--border-up': border === 'up',
      'arwes-frame--border-down': border === 'down',
      'arwes-frame--corners1': corners === 1,
      'arwes-frame--corners2': corners === 2,
    }, className);

    const clsCorners = classNames('arwes-frame__corner', `arwes-frame__corner--l${corners}`);

    return (
      <div className={cls} {...rest}>
        <div className='arwes-frame__box'>
          { !!corners && <div className={`${clsCorners} arwes-frame__lt`}></div> }
          { !!corners && <div className={`${clsCorners} arwes-frame__lb`}></div> }
          { !!corners && <div className={`${clsCorners} arwes-frame__rt`}></div> }
          { !!corners && <div className={`${clsCorners} arwes-frame__rb`}></div> }
          <div className='arwes-frame__content'>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Frame.propTypes = {
  border: PropTypes.oneOf(['up', 'down']),
  corners: PropTypes.number,
};

Frame.defaultProps = {
  border: null,
  corners: 0,
};
