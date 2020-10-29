/* eslint-disable react/prop-types */

import React, { createRef } from 'react';
import anime from 'animejs';
import { AnimationProvider } from '../AnimationProvider';
import { withEnergy } from './withEnergy';

const COLOR_ON = '#0f0';
const COLOR_OFF = '#f00';

class ItemComponent extends React.PureComponent {
  constructor () {
    super(...arguments);
    this.element = createRef();
  }

  render () {
    const { energy, children } = this.props;
    return (
      <div
        ref={this.element}
        style={{ backgroundColor: COLOR_OFF, marginLeft: '10px' }}
      >
        <div>{energy.flow.value}</div>
        <div>{children}</div>
      </div>
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

const Item = withEnergy()(ItemComponent);

class Sandbox extends React.PureComponent {
  constructor () {
    super(...arguments);
    this.interval = null;
    this.state = { activate: true };
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({
        activate: !this.state.activate
      });
    }, 2000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    const { activate } = this.state;
    return (
      <AnimationProvider duration={500}>
        <Item energy={{ activate }}>
          <Item>
            <Item />
          </Item>
        </Item>
      </AnimationProvider>
    );
  }
}

export default Sandbox;
