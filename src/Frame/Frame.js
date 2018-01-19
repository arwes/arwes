import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';

export default class Frame extends Component {

  static propTypes = {
    Animation: PropTypes.any.isRequired,

    theme: PropTypes.any.isRequired,
    classes: PropTypes.any.isRequired,

    animate: PropTypes.bool,
    show: PropTypes.bool,
    animation: PropTypes.object,

    /**
     * It uses the `deploy` player.
     */
    sounds: PropTypes.object,

    layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),

    /**
     * The background color level. The bigger the brighter.
     */
    level: PropTypes.oneOf([0, 1, 2, 3]),

    /**
     * The corners size.
     */
    corners: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),

    disabled: PropTypes.bool,
    active: PropTypes.bool,

    /**
     * If component should be animated on mouse hover.
     */
    hover: PropTypes.bool,

    /**
     * Prevent background to be shown.
     */
    noBackground: PropTypes.bool,

    /**
     * If function, receives the animation status object.
     */
    children: PropTypes.any,
  }

  static defaultProps = {
    Animation: AnimationComponent,
    sounds: {},
    show: true,
    layer: 'primary',
    level: 0,
    corners: 0,
  }

  componentDidMount () {
    const { animate, show, sounds } = this.props;
    if (animate && show) {
      sounds.deploy && sounds.deploy.play();
    }
  }

  componentDidUpdate (prevProps) {
    const { animate, show, sounds } = this.props;
    if (animate && prevProps.show !== show) {
      sounds.deploy && sounds.deploy.play();
    }
  }

  componentWillUnmount () {
    const { animate, sounds } = this.props;
    if (animate) {
      sounds.deploy && sounds.deploy.stop();
    }
  }

  render () {
    const {
      Animation,
      animation,
      theme,
      classes,
      sounds,
      animate,
      show,
      layer,
      level,
      corners,
      disabled,
      active,
      hover,
      noBackground,
      className,
      children,
      ...etc
    } = this.props;

    const cls = cx(classes.root, {
      [classes.hover]: !disabled && hover,
    }, className);

    return (
      <Animation
        show={show}
        animate={animate}
        timeout={theme.animTime}
        {...animation}
      >
        {anim => (
        <div className={cx(cls, classes[anim.status])} {...etc}>

          <div className={cx(classes.border, classes.borderLeft)} />
          <div className={cx(classes.border, classes.borderRight)} />
          <div className={cx(classes.border, classes.borderTop)} />
          <div className={cx(classes.border, classes.borderBottom)} />

          { !!corners && <div className={cx(classes.corner, classes.cornerLT)} />}
          { !!corners && <div className={cx(classes.corner, classes.cornerLB)} />}
          { !!corners && <div className={cx(classes.corner, classes.cornerRT)} />}
          { !!corners && <div className={cx(classes.corner, classes.cornerRB)} />}

          <div className={classes.box}>
            <div className={classes.children}>
              {typeof children === 'function' ? children(anim) : children}
            </div>
          </div>
        </div>
        )}
      </Animation>
    );
  }
}
