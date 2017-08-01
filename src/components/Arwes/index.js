import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import docReady from 'doc-ready';
import responsive from '../../tools/responsive';

/**
 * Application container.
 */
export default class Arwes extends Component {

  constructor () {
    super(...arguments);
    this.state = {
      bg: null,
      pattern: null,
      ready: false,
    };
  }

  componentDidMount () {

    docReady(() => this.setState({ ready: true }));

    this.onUpdateBG();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.resources !== this.props.resources) {
      this.onupdate();
    }
  }

  render () {

    const { anim, resources, className, children, ...rest } = this.props;
    const cls = classNames('arwes', {
      'arwes--ready': this.state.ready,
      'arwes--resources': resources,
      'arwes--anim': anim,
    }, className);
    const { pattern } = resources || {};

    const bg = this.state.bg;
    const bgStyle = bg && { backgroundImage: `url(${bg})` };
    const patternStyle = pattern && { backgroundImage: `url(${pattern})` };

    return (
      <div className={cls} style={bgStyle} {...rest}>
        <div className="arwes__pattern" style={patternStyle}>
          <div className="arwes__intern"></div>
          <div className="arwes__main">
            {children}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Update the background image based on viewport and provided resources.
   */
  onUpdateBG () {

    const { resources } = this.props;
    let bgs = resources && resources.bg;

    responsive.off(this.onBgChange);

    if (bgs) {
      if (typeof bgs === 'string') {
        this.setState({ bg: bgs });
      } else {
        this.onBgChange = responsive.on(dims => {
          const bg = dims.small ? bgs.small : dims.medium ? bgs.medium : bgs.large;
          this.setState({ bg });
        });
      }
    }
  }
}

Arwes.propTypes = {

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
   * Animations enabled.
   */
  anim: PropTypes.bool,
};

Arwes.defaultProps = {
  resources: null,
  anim: false,
};
