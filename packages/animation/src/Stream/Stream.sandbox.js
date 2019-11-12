/* eslint-disable react/prop-types */

import React, { createRef } from 'react';
import anime from 'animejs';
import { withEnergy } from '../withEnergy';
import { AnimationProvider } from '../AnimationProvider';
import { Stream } from './Stream';

const COLOR_ON = '#0f0';
const COLOR_OFF = '#f00';

const Item = withEnergy()(
  class ItemBase extends React.PureComponent {
    element = createRef()

    render () {
      return (
        <li ref={this.element} style={{ backgroundColor: COLOR_OFF }}>
          <div>{this.props.energy.flow.value}</div>
        </li>
      );
    }

    enter () {
      anime({
        targets: this.element.current,
        backgroundColor: [COLOR_OFF, COLOR_ON],
        duration: this.props.energy.getDuration().enter,
        easing: 'linear'
      });
    }

    exit () {
      anime({
        targets: this.element.current,
        backgroundColor: [COLOR_ON, COLOR_OFF],
        duration: this.props.energy.getDuration().exit,
        easing: 'linear'
      });
    }
  }
);

class Sandbox extends React.PureComponent {
  interval = null
  state = { activate: true }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({ activate: !this.state.activate });
    }, 4000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    return (
      <AnimationProvider duration={{ enter: 500, exit: 500, stagger: 250 }}>
        <Stream activate={this.state.activate} serial>
          <ul>
            <Item />
            <Item />
            <Stream>
              <ul>
                <Item />
                <Item />
                <Item />
              </ul>
            </Stream>
            <Item />
            <Item />
          </ul>
        </Stream>
      </AnimationProvider>
    );
  }
}

export default Sandbox;
