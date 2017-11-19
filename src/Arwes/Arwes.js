import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import docReady from 'doc-ready';

import Animation from '../Animation';
import Puffs from '../Puffs';
import loader from '../tools/loader';
import responsive from '../tools/responsive';

export default class Arwes extends Component {

  static propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    animate: PropTypes.bool,
    show: PropTypes.bool,

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
     * Show resources on interface when loaded.
     */
    showResources: PropTypes.bool,

    /**
     * How often to create new puffs, this is passed down to <Puffs />.
     */
    puffInterval: PropTypes.number,
  };

  static defaultProps = {
    animate: false,
    show: true,
    resources: null,
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
  }

  componentDidUpdate (prevProps, prevState) {

    if (prevProps.resources !== this.props.resources) {
      this.loadResources();
    }

    const { documentReady, resourcesReady } = this.state;
    const ready = documentReady && resourcesReady;
    if (prevState.ready !== ready) {
      this.setState({ ready });
    }
  }

  render () {

    const {
      theme,
      classes,
      animate,
      show,
      showResources,
      resources,
      puffInterval,
      className,
      children,
      ...rest
    } = this.props;

    const { ready } = this.state;
    const cls = cx('arwes', classes.root, {
      [classes.isReady]: show && ready,
      [classes.isShowResources]: show && showResources,
    }, className);
    const { bg, pattern } = this.getActiveResources();

    let backgroundStyle;
    if (show && ready && showResources && bg) {
      backgroundStyle = { backgroundImage: `url(${bg})` };
    }

    let patternStyle;
    if (show && ready && showResources && pattern) {
      patternStyle = { backgroundImage: `url(${pattern})` };
    }

    return (
      <Animation show={show} animate={animate} timeout={theme.animTime}>
        {anim => (
        <div className={cx(cls, classes[anim.status])} {...rest}>
          <div className={classes.background} style={backgroundStyle} />
          <div className={classes.pattern} style={patternStyle} />
          <Puffs
            className={classes.puffs}
            animate={show && animate}
            puffInterval={puffInterval}
          />
          <div className={classes.main}>
            {children}
          </div>
        </div>
        )}
      </Animation>
    );
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
      bg && loader.loadImage(bg),
      pattern && loader.loadImage(pattern)
    ]).then(() => {
      this.setState({ resourcesReady: true });
    });
  }
}
