import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Puffs extends Component {

  static propTypes = {
    theme: PropTypes.any.isRequired,
    classes: PropTypes.any.isRequired,

    animate: PropTypes.bool,

    /**
     * How often to create new puffs. Should be greater than 4000ms.
     */
    puffInterval: PropTypes.number,

    /**
     * Total number of puffs to create.
     */
    quantity: PropTypes.number,
  };

  static defaultProps = {
    animate: true,
    puffInterval: 5000,
    quantity: 8,
  };

  // Root element.
  element = null;

  // Timeout to start next puff animations.
  puffTimeout = null;

  // Timeout to remove current puff animations.
  puffElementsTimeout = null;

  componentDidMount () {
    if (this.props.animate) {
      this.startAnimations();
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.animate !== this.props.animate) {
      if (this.props.animate) {
        this.startAnimations();
      } else {
        this.stopAnimations();
      }
    }
  }

  componentWillUnmount () {
    this.stopAnimations();
  }

  render () {

    const {
      theme,
      classes,
      animate,
      puffInterval,
      quantity,
      className,
      children,
      ...etc
    } = this.props;
    const cls = cx(classes.root, className);

    return (
      <div className={cls} ref={el => (this.element = el)} {...etc}>
        <div className={classes.children}>
          {children}
        </div>
      </div>
    );
  }

  stopAnimations () {
    clearInterval(this.puffTimeout);
    clearTimeout(this.puffElementsTimeout);
  }

  startAnimations () {
    this.onPuffs();
    this.puffTimeout = setInterval(this.onPuffs, this.props.puffInterval);
  }

  /**
   * Create a random set of puffs on the back of the container.
   */
  onPuffs = () => {

    let puffs = [];
    for (let i = 0; i < this.props.quantity; i++) {
      puffs.push(this.createPuff());
    }

    puffs.forEach(puff => this.element.appendChild(puff));

    this.puffElementsTimeout = setTimeout(() => {
      puffs.forEach(puff => puff.remove());
    }, this.props.puffInterval - 100);
  }

  /**
   * Create a puff with random valid properties.
   * @return {HTMLElement}
   */
  createPuff () {

    const { classes } = this.props;

    const puff = document.createElement('div');

    const isLong = Math.round(Math.random());
    const cls = classes.puff + (isLong ? ' ' + classes.puffLong : '');
    puff.setAttribute('class', cls);

    const duration = 1000 + Math.round(Math.random() * 3000);
    puff.style.animationDuration = duration + 'ms';

    const width = this.element.offsetWidth;
    const height = this.element.offsetHeight;
    puff.style.left = (50 + Math.round(Math.random() * (width - 100))) + 'px';
    puff.style.top = (100 + Math.round(Math.random() * (height - 200))) + 'px';

    return puff;
  }
}
