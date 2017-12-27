import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';
import FrameComponent from '../Frame';
import LoadingComponent from '../Loading';
import { getResponsiveResource } from '../tools/utils';
import createLoaderModule from '../tools/createLoader';
import createResponsiveModule from '../tools/createResponsive';

export default class Image extends Component {

  static propTypes = {
    Animation: PropTypes.any.isRequired,
    Frame: PropTypes.any.isRequired,
    Loading: PropTypes.any.isRequired,
    createLoader: PropTypes.any.isRequired,
    createResponsive: PropTypes.any.isRequired,

    theme: PropTypes.any.isRequired,
    classes: PropTypes.any.isRequired,

    animate: PropTypes.bool,
    show: PropTypes.bool,
    animation: PropTypes.object,

    layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),

    /**
     * If the resources should be loaded.
     */
    loadResources: PropTypes.bool,

    /**
     * The image resource or the images resources according to device viewport.
     */
    resources: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        small: PropTypes.string.isRequired,
        medium: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
        xlarge: PropTypes.string.isRequired,
      })
    ]).isRequired,

    /**
     * i18n messages.
     */
    i18n: PropTypes.shape({
      error: PropTypes.string,
    }),

    /**
     * Props to pass down to the `<img />` element.
     */
    imgProps: PropTypes.object,

    /**
     * If function, receives the animation status object.
     */
    children: PropTypes.any,
  }

  static defaultProps = {
    Animation: AnimationComponent,
    Frame: FrameComponent,
    Loading: LoadingComponent,
    createLoader: createLoaderModule,
    createResponsive: createResponsiveModule,
    show: true,
    layer: 'primary',
    loadResources: true,
    i18n: {
      error: 'Image error',
    },
    imgProps: {},
  }

  getDefaultState () {
    return {
      ready: false,  // if active resource is loaded
      error: false,  // if resource had an error
      resource: null,  // the active resource
    };
  }

  constructor () {
    super(...arguments);

    this.state = this.getDefaultState();

    this.loader = this.props.createLoader();
    this.responsive = this.props.createResponsive({
      getTheme: () => this.props.theme
    });
  }

  componentDidMount () {
    this.loadResource();
  }

  componentDidUpdate (prevProps) {
    if (this.props.resources !== prevProps.resources) {
      this.loadResource();
    }
  }

  render () {
    const {
      Animation,
      Frame,
      Loading,
      createLoader,
      createResponsive,
      animation,
      theme,
      classes,
      animate,
      show,
      layer,
      loadResources,
      resources,
      imgProps,
      i18n,
      className,
      children,
      ...etc
    } = this.props;

    const { ready, error, resource } = this.state;

    const cls = cx(classes.root, {
      [classes.ready]: ready
    }, className);

    return (
      <Animation
        animate={animate}
        show={show}
        timeout={theme.animTime}
        {...animation}
      >
        {anim => (
          <figure className={cx(cls, classes[anim.status])} {...etc}>
            <Frame animate={animate} show={show} layer={layer}>
              <div className={classes.holder}>
                <img
                  {...imgProps}
                  className={cx(classes.img, imgProps.className)}
                  src={resource}
                />
                {error && (
                  <div className={classes.error}>{i18n.error}</div>
                )}
                {!ready && !error && (
                  <Loading
                    full
                    animate={animate}
                    show={show}
                    layer={layer}
                  />
                )}
              </div>
              {!!children && (
                <div className={classes.separator} />
              )}
              {!!children && (
                <figcaption className={classes.children}>
                  <small>
                    {typeof children === 'function' ? children(anim) : children}
                  </small>
                </figcaption>
              )}
            </Frame>
          </figure>
        )}
      </Animation>
    );
  }

  /**
   * If enabled, load the resources provided.
   * It doesn't return the state of the loading, it will update the state.
   */
  loadResource () {
    const { resources, loadResources } = this.props;

    if (!loadResources) {
      return;
    }

    const responsive = this.responsive.get();
    const resource = getResponsiveResource(resources, responsive);

    this.setState(this.getDefaultState());

    this.loader
      .load({ images: [resource] })
      .then(() => {
        this.setState({ ready: true, resource });
      }, () => {
        this.setState({ error: true });
      });
  }
}
