import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Frame extends Component {

  constructor () {
    super(...arguments);
  }

  render () {

    const {
      component,
      border,
      corners,
      content,
      theme,
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

    return React.createElement(
      component,
      { className: cls, 'data-theme': theme, ...rest },
      <div className='arwes-frame__box'>
        { !!corners && <div className={`${clsCorners} arwes-frame__lt`}></div> }
        { !!corners && <div className={`${clsCorners} arwes-frame__lb`}></div> }
        { !!corners && <div className={`${clsCorners} arwes-frame__rt`}></div> }
        { !!corners && <div className={`${clsCorners} arwes-frame__rb`}></div> }
        <div className='arwes-frame__content'>
          {children}
        </div>
      </div>
    );
  }
}

Frame.propTypes = {
  component: PropTypes.string,
  border: PropTypes.oneOf(['up', 'down']),
  theme: PropTypes.oneOf(['success', 'alert', 'disabled']),
  corners: PropTypes.number,
};

Frame.defaultProps = {
  component: 'div',
  border: null,
  theme: null,
  corners: 0,
};
