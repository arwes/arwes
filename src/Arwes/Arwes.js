import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';
import PuffsComponent from '../Puffs';
import loader from '../tools/loader';
import responsive from '../tools/responsive';

export default class Arwes extends Component {

  static propTypes = {
    Animation: PropTypes.any.isRequired,
    Puffs: PropTypes.any.isRequired,
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    animate: PropTypes.bool,
    show: PropTypes.bool,
    loadResources: PropTypes.bool,

    /**
     * The resources to load. In this case it is the background image on
     * the back and the pattern image in the middle.
     */
    resources: PropTypes.shape({
      bg: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          small: PropTypes.string,
          medium: PropTypes.string,
          large: PropTypes.string,
        }),
      ]),
      pattern: PropTypes.string,
    }),

    /**
     * If to show the resources when they are loaded.
     */
    showResources: PropTypes.bool,

    /**
     * Properties to pass down to Puffs component.
     */
    puffsProps: PropTypes.object,
  };

  static defaultProps = {
    Animation: AnimationComponent,
    Puffs: PuffsComponent,
    animate: false,
    show: true,
    resources: null,
    loadResources: true,
    showResources: true,
  }

  constructor () {
    super(...arguments);

    this.state = {
      readyResources: false
    };

    this.responsive = responsive(() => this.props.theme);
  }

  componentDidMount () {
    this.loadResources();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.resources !== this.props.resources) {
      this.loadResources();
    }
  }

  render () {

    const {
      Animation,
      Puffs,
      theme,
      classes,
      animate,
      show,
      resources,
      loadResources,
      showResources,
      puffsProps,
      className,
      children,
      ...rest
    } = this.props;

    // Resources are rendered when animation allows it, the component receives
    // the signal to render them and they are loaded.
    const { bg, pattern } = this.getActiveResources();
    const resourcesReadyToShow = (animate ? show : true)
      && showResources && this.state.readyResources;

    const cls = cx('arwes', classes.root, {
      [classes.resourcesReadyToShow]: resourcesReadyToShow
    }, className);

    let backgroundStyle;
    if (resourcesReadyToShow && bg) {
      backgroundStyle = { backgroundImage: `url(${bg})` };
    }

    let patternStyle;
    if (resourcesReadyToShow && pattern) {
      patternStyle = { backgroundImage: `url(${pattern})` };
    }

    return (
      <Animation show={show} animate={animate} timeout={theme.animTime}>
        {anim => (
        <div className={cx(cls, classes[anim.status])} {...rest}>
          <div className={classes.background} style={backgroundStyle} />
          <div className={classes.pattern} style={patternStyle} />
          <Puffs
            {...puffsProps}
            className={classes.puffs}
            animate={show && animate}
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
   * Load active resources if they can be loaded.
   * Doesn't return the state, it only loads the data.
   */
  loadResources () {

    if (!this.props.loadResources) {
      return;
    }

    const { bg, pattern } = this.getActiveResources();

    this.setState({ readyResources: false });

    Promise.all([
      bg && loader.loadImage(bg),
      pattern && loader.loadImage(pattern)
    ]).then(() => {
      this.setState({ readyResources: true });
    });
  }
}
