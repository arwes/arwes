import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// HTMLElement animation end event names.
const ON_ANIMATION_END = [
  'webkitAnimationEnd',
  'mozAnimationEnd',
  'MSAnimationEnd',
  'oanimationend',
  'animationend'
];

export default class Highlight extends Component {

  static propTypes = {
    animate: PropTypes.bool,
    layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),
  };

  static defaultProps = {
    animate: true,
    layer: 'primary',
  };

  // The root element.
  element = null;

  // Last click element created.
  clickElement = null;

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

  /**
   * Click event on element. Reproduces the animation.
   */
  onClick = () => {

    const { animate, classes } = this.props;

    if (animate) {

      if (this.clickElement) {
        this.clickElement.remove();
      }

      this.clickElement = document.createElement('div');
      this.clickElement.setAttribute('class', classes.click);
      this.element.appendChild(this.clickElement);

      ON_ANIMATION_END.forEach(event => {
        this.clickElement.addEventListener(event, () => this.clickElement.remove());
      });
    }
  }
}
