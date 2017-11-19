import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Highlight extends Component {

  static propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    animate: PropTypes.bool,
    layer: PropTypes.oneOf(['primary', 'success', 'alert', 'disabled']),
  };

  static defaultProps = {
    animate: true,
    layer: 'primary',
  };

  // The root element.
  element = null;

  // Last click element created.
  clickEl = null;

  // Last click timeout animation.
  clickTimeout = null;

  componentWillUnmount () {
    clearTimeout(this.clickTimeout);
  }

  render () {

    const { theme, classes, layer, animate, className, children, ...etc } = this.props;
    const cls = cx(classes.root, classes[layer], className);

    return (
      <div className={cls} ref={el => (this.element = el)} {...etc}>
        <div className={classes.children} onClick={this.onClick}>
          {children}
        </div>
      </div>
    );
  }

  onClick = () => {

    const { animate, classes, theme } = this.props;

    if (animate) {

      if (this.clickEl) {
        this.clickEl.remove();
      }
      clearTimeout(this.clickTimeout);

      this.clickEl = document.createElement('div');
      this.clickEl.setAttribute('class', classes.click);
      this.element.appendChild(this.clickEl);

      this.clickTimeout = setTimeout(() => this.clickEl.remove(), theme.animTime);
    }
  }
}
