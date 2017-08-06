import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Base container.
 */
export default class Frame extends Component {

  constructor () {
    super(...arguments);
  }

  render () {

    const {
      node,
      border,
      level,
      corners,
      content,
      theme,
      className,
      children,
      ...rest
    } = this.props;

    const bVals = border === true ? [1] : Array.isArray(border) ? border.slice(0, 4) : [];
    const bLength = bVals.length;
    const cls = classNames('arwes-frame', {
      'arwes-frame--content': content,
      'arwes-frame--border': bLength,
      'arwes-frame--level-1': level === -1,
      'arwes-frame--level1': level === 1,
      'arwes-frame--level2': level === 2,
      'arwes-frame--level3': level === 3,
      'arwes-frame--corners1': corners === 1,
      'arwes-frame--corners2': corners === 2,
      'arwes-frame--corners3': corners === 3,
    }, className);

    const clsCorners = classNames('arwes-frame__corner', `arwes-frame__corner--l${corners}`);

    let boxStyle;
    if (bLength) {
      const [b1, b2, b3] = bVals;
      boxStyle = bLength === 1
        ? [b1, b1, b1, b1]
        : bLength === 2
          ? [b1, b2, b1, b2]
          : bLength === 3
            ? [b1, b2, b3, b2]
            : bVals;
      boxStyle = boxStyle.map(el => el + 'px').join(' ');
      boxStyle = boxStyle && { borderWidth: boxStyle };
    }

    return React.createElement(
      node,
      { className: cls, 'data-theme': theme, ...rest },
      <div className='arwes-frame__box' style={boxStyle}>
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
  node: PropTypes.string,
  border: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  level: PropTypes.oneOf([-1, 0, 1, 2, 3]),
  corners: PropTypes.oneOf([0, 1, 2, 3]),
  theme: PropTypes.oneOf(['success', 'alert', 'disabled']),
};

Frame.defaultProps = {
  node: 'div',
  border: false,
  level: 1,
  corners: 0,
  theme: null,
};
