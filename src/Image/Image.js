import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';
import FrameComponent from '../Frame';

export default function Image (props) {

  const {
    Animation,
    Frame,
    theme,
    classes,
    animate,
    show,
    layer,
    className,
    src,
    alt,
    caption,
    imgProps,
    ...etc
  } = props;
  const cls = cx(classes.root, className);

  return (
    <Animation animate={animate} show={show} timeout={theme.animTime}>
      {anim => (
        <figure className={cx(cls, classes[anim.status])} {...etc}>
          <Frame animate={animate} show={show} layer={layer}>
            <img
              {...imgProps}
              className={cx(classes.img, imgProps.className)}
              src={src}
              alt={alt}
            />
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

Image.propTypes = {
  Animation: PropTypes.any.isRequired,
  Frame: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  animate: PropTypes.bool,
  show: PropTypes.bool,
  layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  caption: PropTypes.any,
  imgProps: PropTypes.object,
};

Image.defaultProps = {
  Animation: AnimationComponent,
  Frame: FrameComponent,
  animate: false,
  show: true,
  layer: 'primary',
  imgProps: {},
};
