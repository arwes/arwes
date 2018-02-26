import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';
import HighlightComponent from '../Highlight';
import FrameComponent from '../Frame';

export default class Button extends Component {

  static propTypes = {
    Animation: PropTypes.any.isRequired,
    Highlight: PropTypes.any.isRequired,
    Frame: PropTypes.any.isRequired,

    theme: PropTypes.any.isRequired,
    classes: PropTypes.any.isRequired,

    animate: PropTypes.bool,
    show: PropTypes.bool,
    animation: PropTypes.object,

    /**
     * It uses the `click` player.
     */
    sounds: PropTypes.object,

    layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),
    disabled: PropTypes.bool,
    active: PropTypes.bool,

    /**
     * The inside `<Frame />` level.
     */
    level: PropTypes.number,

    /**
     * Props to pass down to the `<button />` element.
     */
    buttonProps: PropTypes.object,

    /**
     * If function, receives the animation status object.
     */
    children: PropTypes.any,
  }

  static defaultProps = {
    Animation: AnimationComponent,
    Highlight: HighlightComponent,
    Frame: FrameComponent,
    sounds: {},
    show: true,
    layer: 'control',
    level: 2,
  }

  render () {
    const {
      Animation,
      Highlight,
      Frame,
      theme,
      classes,
      sounds,
      animation,
      animate,
      show,
      layer,
      level,
      disabled,
      active,
      className,
      buttonProps,
      children,
      ...etc
    } = this.props;
    const cls = cx(classes.root, className);

    return (
      <Animation
        show={show}
        animate={animate}
        timeout={theme.animTime}
        {...animation}
      >
        {anim => (
        <div
          className={cls}
          {...etc}
          onClick={this.onClick}
        >
          <Frame
            hover
            animate={animate}
            show={show}
            corners={1}
            level={level}
            layer={disabled ? 'disabled' : layer}
            disabled={disabled}
            active={active}
          >
            <Highlight animate={!disabled} layer={layer}>
              <button
                className={classes.button}
                disabled={disabled}
                {...buttonProps}
              >
                {typeof children === 'function' ? children(anim) : children}
              </button>
            </Highlight>
          </Frame>
        </div>
        )}
      </Animation>
    );
  }

  /**
   * Internal click event listener.
   * @param  {Event} ev
   */
  onClick = (ev) => {
    const { disabled, onClick, animate, sounds } = this.props;

    if (!disabled) {
      onClick && onClick(ev);

      if (animate) {
        sounds.click && sounds.click.play();
      }
    }
  }
}
