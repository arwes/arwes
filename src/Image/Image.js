import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';
import FrameComponent from '../Frame';
import LoadingComponent from '../Loading';
import { getResponsiveResource } from '../tools/utils';
import createLoaderModule from '../tools/loader';
import createResponsiveModule from '../tools/responsive';

export default class Image extends Component {

  static propTypes = {
    Animation: PropTypes.any.isRequired,
    Frame: PropTypes.any.isRequired,
    Loading: PropTypes.any.isRequired,
    createLoader: PropTypes.any.isRequired,
    createResponsive: PropTypes.any.isRequired,
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    animate: PropTypes.bool,
    show: PropTypes.bool,
    layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),
    loadResources: PropTypes.bool,

    /**
     * The image resource or the images resources according to device.
     */
    resources: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        small: PropTypes.string.isRequired,
        medium: PropTypes.string.isRequired,
        large: PropTypes.string.isRequired,
      })
    ]).isRequired,

    /**
     * A small description of the image to display below it.
     */
    caption: PropTypes.any,

    /**
     * Props to pass down to the `<img />` element.
     */
    imgProps: PropTypes.object,
  }

  static defaultProps = {
    Animation: AnimationComponent,
    Frame: FrameComponent,
    Loading: LoadingComponent,
    createLoader: createLoaderModule,
    createResponsive: createResponsiveModule,
    animate: false,
    show: true,
    layer: 'primary',
    loadResources: true,
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
      theme,
      classes,
      animate,
      show,
      layer,
      loadResources,
      resources,
      caption,
      imgProps,
      className,
      ...etc
    } = this.props;

    const { ready, error, resource } = this.state;

    const cls = cx(classes.root, {
      [classes.ready]: ready
    }, className);

    return (
      <Animation animate={animate} show={show} timeout={theme.animTime}>
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
                  <p>An error has ocurred</p>
                )}
                {!ready && (
                  <Loading
                    full
                    animate={animate}
                    show={show}
                    layer={layer}
                  />
                )}
              </div>
              {!!caption && (
                <div className={classes.separator} />
              )}
              {!!caption && (
                <figcaption className={classes.caption}>
                  <small>{caption}</small>
                </figcaption>
              )}
            </Frame>
          </figure>
        )}
      </Animation>
    );
  }

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
