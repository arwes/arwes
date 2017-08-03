import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import docReady from 'doc-ready';
import getDims from '../../tools/get-dims';
import responsive from '../../tools/responsive';

// How often to create new puffs. Should be greater than 4 seconds.
const ARWES_PUFFS_INTERVAL = 5000;

/**
 * Application container.
 */
export default class Arwes extends Component {

  constructor () {
    super(...arguments);

    this.state = {
      ready: false,
    };
  }

  componentDidMount () {

    docReady(() => this.setState({ ready: true }));

    this.puffInterval = setInterval(this.onPuffs, ARWES_PUFFS_INTERVAL);
  }

  componentWillUnmount () {
    clearInterval(this.puffInterval);
    clearTimeout(this.puffTimeout);
  }

  render () {

    const { anim, resources, className, children, ...rest } = this.props;
    const cls = classNames('arwes', {
      'arwes--ready': this.state.ready,
      'arwes--resources': resources,
      'arwes--anim': anim,
    }, className);

    const { pattern: patternImage, bg } = resources || {};

    let patternStyle;
    if (this.state.ready && patternImage) {
      patternStyle = { backgroundImage: `url(${patternImage})` };
    }

    let bgImage;
    let bgStyle;
    if (typeof bg === 'string') {
      bgImage = bg;
    } else if (bg) {
      const dims = responsive.get();
      bgImage = dims.small ? bg.small : dims.medium ? bg.medium : bg.large;
    }
    if (this.state.ready && bgImage) {
      bgStyle = { backgroundImage: `url(${bgImage})` };
    }

    return (
      <div className={cls} style={bgStyle} {...rest}>
        <div className="arwes__pattern" style={patternStyle}>
          <div className="arwes__intern" ref={el => (this.elIntern = el)}>
          </div>
          <div className="arwes__main">
            {children}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Create a random set of puffs on the back of the container.
   */
  onPuffs = () => {

    let puffs = [];
    for (let i = 0; i < 10; i++) {
      puffs.push(this.createPuff());
    }

    puffs.forEach(puff => this.elIntern.appendChild(puff));

    this.puffTimeout = setTimeout(() => {
      puffs.forEach(puff => puff.remove());
    }, ARWES_PUFFS_INTERVAL - 100);
  }

  /**
   * Create a puff with random valid properties.
   * @return  {DOMElement}
   */
  createPuff () {

    const el = document.createElement('div');
    el.setAttribute('class', 'arwes__puff');

    if (Math.round(Math.random())) {
      el.setAttribute('class', 'arwes__puff arwes__puff--1');
    }

    const time = 1000 + Math.round(Math.random() * 3000);
    el.style.animationDuration = time + 'ms';

    const { width, height } = getDims();
    el.style.left = (50 + Math.round(Math.random() * width - 100)) + 'px';
    el.style.top = (100 + Math.round(Math.random() * height - 200)) + 'px';

    return el;
  }
}

Arwes.propTypes = {

  /**
   * Resources to render.
   */
  resources: PropTypes.shape({

    // Background
    bg: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        small: PropTypes.string,
        medium: PropTypes.string,
        large: PropTypes.string,
      }),
    ]),

    // Pattern
    pattern: PropTypes.string,
  }),

  /**
   * Animations enabled.
   */
  anim: PropTypes.bool,
};

Arwes.defaultProps = {
  resources: null,
  anim: false,
};
