import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';

export default class Footer extends Component {

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

    /**
     * If function, receives the animation status object.
     */
    children: PropTypes.any,
  };

  static defaultProps = {
    Animation: AnimationComponent,
    sounds: {},
    show: true,
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
      theme,
      classes,
      Animation,
      animation,
      sounds,
      animate,
      show,
      className,
      children,
      ...etc
    } = this.props;
    const cls = cx(classes.root, className);

    return (
      <Animation
        animate={animate}
        show={show}
        timeout={theme.animTime}
        {...animation}
      >
        {anim => (
          <footer className={cx(cls, classes[anim.status])} {...etc}>
            <div className={classes.separator} />
            <div className={classes.children}>
              {typeof children === 'function' ? children(anim) : children}
            </div>
          </footer>
        )}
      </Animation>
    );
  }
}
