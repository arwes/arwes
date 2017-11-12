import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Button extends Component {

  static propTypes = {
    mode: PropTypes.oneOf(['', 'success', 'alert']),
    children: PropTypes.any,
  }

  static defaultProps = {
    mode: '',
    children: '',
  }

  constructor () {
    super(...arguments);
  }

  componentWillUnmount () {
    clearTimeout(this.clickTimeout);
  }

  render () {

    const { mode, disabled, classes, className, children, ...etc } = this.props;
    const cls = cx('button', classes.root, {
      [classes.success]: mode === 'success',
      [classes.alert]: mode === 'alert',
    }, className);

    return (
      <div className={cls} ref={el => (this.element = el)} {...etc}>
        <button
          className={classes.button}
          disabled={disabled}
          onClick={this.onClick}
        >
          {children}
        </button>
      </div>
    );
  }

  onClick = () => {

    const { disabled, classes, theme } = this.props;

    if (!disabled) {

      if (this.clickEl) this.clickEl.remove();
      clearTimeout(this.clickTimeout);

      this.clickEl = document.createElement('div');
      this.clickEl.setAttribute('class', classes.click);
      this.element.appendChild(this.clickEl);

      this.clickTimeout = setTimeout(() => this.clickEl.remove(), theme.animTime * 3);
    }
  }
}
