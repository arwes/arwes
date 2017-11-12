import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import docReady from 'doc-ready';

import getDimensions from '../tools/get-dimensions';
import { loadImage } from '../tools/loader';
import responsive from '../tools/responsive';

/**
 * Arwes application container. This component is the root and should be once
 * in the application.
 */
export default class Arwes extends Component {

  static propTypes = {

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
    animated: PropTypes.bool,

    /**
     * Show resources on interface when loaded.
     */
    showResources: PropTypes.bool,

    /**
     * How often to create new puffs.
     * Should be greater than 4 seconds.
     */
    puffInterval: PropTypes.number,
  };

  static defaultProps = {
    resources: null,
    animated: false,
    showResources: true,
    puffInterval: 5000,
  }

  constructor () {
    super(...arguments);

    this.state = {
      documentReady: false,
      resourcesReady: false,
      ready: false,
    };

    this.responsive = responsive(() => this.props.theme);
  }

  componentDidMount () {

    docReady(() => {
      this.setState({ documentReady: true });
    });

    this.loadResources();

    if (this.props.animated) {
      this.startAnimations();
    }
  }

  componentDidUpdate (prevProps, prevState) {

    if (prevProps.animated !== this.props.animated) {
      if (this.props.animated) {
        this.startAnimations();
      } else {
        this.stopAnimations();
      }
    }

    if (prevProps.resources !== this.props.resources) {
      this.loadResources();
    }

    const { documentReady, resourcesReady } = this.state;
    const ready = documentReady && resourcesReady;
    if (prevState.ready !== ready) {
      this.setState({ ready });
    }
  }

  componentWillUnmount () {
    this.stopAnimations();
  }

  render () {

    const {
      animated,
      showResources,
      resources,
      puffInterval,
      className,
      classes,
      children,
      ...rest
    } = this.props;

    const { ready } = this.state;
    const cls = cx('arwes', classes.root, {
      [classes.isReady]: ready,
      [classes.isAnimated]: animated,
      [classes.isShowResources]: showResources,
    }, className);
    const { bg, pattern } = this.getActiveResources();

    let backgroundStyle;
    if (ready && showResources && bg) {
      backgroundStyle = { backgroundImage: `url(${bg})` };
    }

    let patternStyle;
    if (ready && showResources && pattern) {
      patternStyle = { backgroundImage: `url(${pattern})` };
    }

    return (
      <div className={cls} {...rest}>
        <div className={classes.background} style={backgroundStyle} />
        <div className={classes.pattern} style={patternStyle} />
        <div className={classes.intern} ref={el => (this.elIntern = el)} />
        <div className={classes.main}>
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
    for (let i = 0; i < 10; i++) {
      puffs.push(this.createPuff());
    }

    puffs.forEach(puff => this.elIntern.appendChild(puff));

    this.puffElementsTimeout = setTimeout(() => {
      puffs.forEach(puff => puff.remove());
    }, this.props.puffInterval - 100);
  }

  /**
   * Create a puff with random valid properties.
   * @return {DOMElement}
   */
  createPuff () {

    const { classes } = this.props;

    const el = document.createElement('div');
    el.setAttribute('class', classes.puff);

    if (Math.round(Math.random())) {
      el.setAttribute('class', `${classes.puff} ${classes.puff1}`);
    }

    const time = 1000 + Math.round(Math.random() * 3000);
    el.style.animationDuration = time + 'ms';

    const { width, height } = getDimensions();
    el.style.left = (50 + Math.round(Math.random() * width - 100)) + 'px';
    el.style.top = (100 + Math.round(Math.random() * height - 200)) + 'px';

    return el;
  }

  /**
   * Get active resources from resources props.
   * @return {Object}
   */
  getActiveResources () {

    const { bg: bgs, pattern } = this.props.resources || {};
    let bg;

    if (typeof bgs === 'string') {
      bg = bgs;
    }
    else if (bgs) {
      const { small, medium } = this.responsive.get();
      bg = small ? bgs.small : medium ? bgs.medium : bgs.large;
    }

    return { bg, pattern };
  }

  /**
   * Load active resources.
   * @return {Promise}
   */
  loadResources () {

    const { bg, pattern } = this.getActiveResources();

    this.setState({ resourcesReady: false });

    return Promise.all([
      bg && loadImage(bg),
      pattern && loadImage(pattern)
    ]).then(() => {
      this.setState({ resourcesReady: true });
    });
  }
}
