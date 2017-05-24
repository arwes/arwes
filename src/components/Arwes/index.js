import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Arwes extends Component {

  constructor () {
    super(...arguments);
  }

  render () {

    const { className, children, ...rest } = this.props;
    const cls = classNames('arwes', className);

    return (
      <div className={cls} {...rest}>
        <div className="arwes__pattern">
          <div className="arwes__intern"></div>
          <div className="arwes__main">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Arwes.propTypes = {};

Arwes.defaultProps = {};
