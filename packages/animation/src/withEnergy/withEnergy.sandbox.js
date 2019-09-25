import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { AnimationProvider } from '../AnimationProvider';
import { withEnergy } from './withEnergy';

class ExampleComponent extends React.PureComponent {
  constructor () {
    super(...arguments);
    this.element = createRef();
  }

  render () {
    const { energy, children } = this.props;
    return (
      <div
        ref={this.element}
        style={{ color: '#f00', marginLeft: '10px' }}
      >
        <div>{energy.flow.value}</div>
        <div>{children}</div>
      </div>
    );
  }

  enter () {
    anime({
      targets: this.element.current,
      color: ['#f00', '#0f0'],
      duration: 500,
      easing: 'linear'
    });
  }

  exit () {
    anime({
      targets: this.element.current,
      color: ['#0f0', '#f00'],
      duration: 500,
      easing: 'linear'
    });
  }
}

ExampleComponent.propTypes = {
  energy: PropTypes.any,
  children: PropTypes.any
};

const Example = withEnergy()(ExampleComponent);

Example.propTypes = {
  energy: PropTypes.any,
  children: PropTypes.any
};

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
        <Example energy={{ activate }}>
          <Example>
            <Example />
          </Example>
        </Example>
      </AnimationProvider>
    );
  }
}

export default Sandbox;
