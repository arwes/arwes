import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Animation from '../Animation';
import Highlight from '../Highlight';
import Frame from '../Frame';

export default class Button extends Component {

  static propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    animate: PropTypes.bool,
    show: PropTypes.bool,
    layer: PropTypes.oneOf(['primary', 'secondary', 'header', 'control', 'success', 'alert', 'disabled']),
    disabled: PropTypes.bool,
    buttonProps: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    animate: false,
    show: true,
    layer: 'control',
    disabled: false,
    children: '',
  }

  render () {

    const {
      theme,
      classes,
      animate,
      show,
      layer,
      disabled,
      className,
      buttonProps,
      children,
      ...etc
    } = this.props;
    const cls = cx(classes.root, classes[layer], className);

    return (
      <Animation show={show} animate={animate} timeout={theme.animTime}>
        {anim => (
        <div
          className={cx(cls, classes[disabled ? 'disabled' : anim.status])}
          onClick={this.onClick}
          {...etc}
        >
          <Frame
            hover
            animate={animate}
            show={show}
            corners={1}
            level={2}
            layer={disabled ? 'disabled' : layer}
            disabled={disabled}
          >
            <Highlight layer={layer} disabled={disabled}>
              <button
                className={classes.button}
                disabled={disabled}
                {...buttonProps}
              >
                {children}
              </button>
            </Highlight>
          </Frame>
        </div>
        )}
      </Animation>
    );
  }

  onClick = (ev) => {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick(ev);
    }
  }
}
