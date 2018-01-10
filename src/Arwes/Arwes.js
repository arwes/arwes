import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';
import PuffsComponent from '../Puffs';
import { getResponsiveResource } from '../tools/utils';
import createLoaderModule from '../tools/createLoader';
import createResponsiveModule from '../tools/createResponsive';

export default class Arwes extends Component {

  static propTypes = {
    Animation: PropTypes.any.isRequired,
    Puffs: PropTypes.any.isRequired,
    createResponsive: PropTypes.any.isRequired,
    createLoader: PropTypes.any.isRequired,

    theme: PropTypes.any.isRequired,
    classes: PropTypes.any.isRequired,

    animate: PropTypes.bool,
    show: PropTypes.bool,
    animation: PropTypes.object,

    /**
     * Background image resources.
     */
    background: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        small: PropTypes.string.isRequired,
        medium: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
        xlarge: PropTypes.string.isRequired,
      }),
    ]),

    /**
     * Pattern image resources.
     */
    pattern: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        small: PropTypes.string.isRequired,
        medium: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
        xlarge: PropTypes.string.isRequired,
      }),
    ]),

    /**
     * If the component should load the resources.
     */
    loadResources: PropTypes.bool,

    /**
     * If to show the resources when they are loaded.
     */
    showResources: PropTypes.bool,

    /**
     * Properties to pass down to `<Puffs />` component.
     */
    puffsProps: PropTypes.object,

    /**
     * If function, receives the animation status object.
     */
    children: PropTypes.any,
  };

  static defaultProps = {
    Animation: AnimationComponent,
    Puffs: PuffsComponent,
    createResponsive: createResponsiveModule,
    createLoader: createLoaderModule,
    show: true,
    loadResources: true,
    showResources: true,
  }

  constructor () {
    super(...arguments);

    this.state = {
      readyResources: false
    };

    this.loader = this.props.createLoader();
    this.responsive = this.props.createResponsive({
      getTheme: () => this.props.theme
    });
  }

  componentDidMount () {
    this.loadResources();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.background !== this.props.background
    || prevProps.pattern !== this.props.pattern) {
      this.loadResources();
    }
  }

  render () {

    const {
      Animation,
      Puffs,
      createResponsive,
      createLoader,
      theme,
      classes,
      animation,
      animate,
      show,
      background,
      pattern,
      loadResources,
      showResources,
      puffsProps,
      className,
      children,
      ...rest
    } = this.props;

    // Resources are rendered when animation allows it, the component receives
    // the signal to render them and they are loaded.
    const res = this.getActiveResources();
    const resourcesReadyToShow = (animate ? show : true)
      && showResources && this.state.readyResources;

    const cls = cx('arwes', classes.root, {
      [classes.resourcesReadyToShow]: resourcesReadyToShow
    }, className);

    let backgroundStyle;
    if (resourcesReadyToShow && res.background) {
      backgroundStyle = { backgroundImage: `url(${res.background})` };
    }

    let patternStyle;
    if (resourcesReadyToShow && res.pattern) {
      patternStyle = { backgroundImage: `url(${res.pattern})` };
    }

    return (
      <Animation
        show={show}
        animate={animate}
        timeout={theme.animTime}
        {...animation}
      >
        {anim => (
        <div className={cx(cls, classes[anim.status])} {...rest}>
          <div className={classes.background} style={backgroundStyle} />
          <div className={classes.pattern} style={patternStyle} />
          <Puffs
            className={cx(classes.puffs, puffsProps && puffsProps.className)}
            animate={!!(show && animate)}
            {...puffsProps}
          />
          <div className={classes.main}>
            {typeof children === 'function' ? children(anim) : children}
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
    const { background, pattern } = this.props;
    const responsive = this.responsive.get();

    return {
      background: getResponsiveResource(background, responsive),
      pattern: getResponsiveResource(pattern, responsive)
    };
  }

  /**
   * Load active resources if they can be loaded.
   * Doesn't return the state, it only loads the data.
   */
  loadResources () {
    if (!this.props.loadResources) {
      return;
    }

    const { background, pattern } = this.getActiveResources();

    this.setState({ readyResources: false });

    const images = [];
    background && images.push(background);
    pattern && images.push(pattern);

    this.loader.load({ images }).then(() => {
      this.setState({ readyResources: true });
    });
  }
}
