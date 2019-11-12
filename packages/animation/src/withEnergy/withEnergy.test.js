/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { withEnergy } from './withEnergy';

// TODO: Research and fix if possible why jest.useFakeTimers(); breaks the tests.
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

afterEach(cleanup);

test('Should render component', () => {
  class ExampleComponent extends React.PureComponent {
    render () {
      return <div>{this.props.children}</div>; // eslint-disable-line react/prop-types
    }
  }
  const Example = withEnergy()(ExampleComponent);
  const { container } = render(<Example>Hello</Example>);
  expect(container.innerHTML).toBe('<div>Hello</div>');
});

test('Should forwardRef', () => {
  let example;
  class ExampleComponent extends React.PureComponent {
    render () {
      return <div>{this.props.children}</div>; // eslint-disable-line react/prop-types
    }
    hi () {
      return 'hi';
    }
  }
  const Example = withEnergy()(ExampleComponent);
  render(<Example ref={r => (example = r)}>Hello</Example>);
  expect(example.hi()).toBe('hi');
});

test('Should pass "energy" props to Energy component', () => {
  class ExampleComponent extends React.PureComponent {
    render () {
      // Since "animate=false", the flow is "entered".
      // TODO: Refactor to use a decoupled way to test this relation.
      expect(this.props.energy).toMatchObject({ flow: { entered: true } }); // eslint-disable-line react/prop-types
      return <div />;
    }
  }
  const Example = withEnergy()(ExampleComponent);
  const energy = { animate: false };
  render(<Example energy={energy} />);
});

test('Should call "enter" on energy flow "entering" if "options.cycles=true" (default)', async () => {
  const onEnter = jest.fn();
  class ExampleComponent extends React.PureComponent {
    render () {
      return <div />;
    }
    enter () {
      onEnter();
    }
  }
  const Example = withEnergy()(ExampleComponent);
  render(<Example energy={{ duration: 100 }} />);

  await sleep(10);
  expect(onEnter).toHaveBeenCalledTimes(1); // TODO: Racing condition failing test.
});

test('Should call "exit" on energy flow "exiting" if "options.cycles=true"', async () => {
  const onEnter = jest.fn();
  const onExit = jest.fn();
  class ExampleComponent extends React.PureComponent {
    render () {
      return <div>{this.props.children}</div>; // eslint-disable-line react/prop-types
    }
    enter () {
      onEnter();
    }
    exit () {
      onExit();
    }
  }
  const Example = withEnergy()(ExampleComponent);

  class Container extends React.PureComponent {
    state = { activate: true }
    render () {
      const { activate } = this.state;
      return <Example energy={{ activate, duration: 50 }} />;
    }
  }
  let container;
  render(<Container ref={r => (container = r)} />);
  setTimeout(() => container.setState({ activate: false }), 200);

  await sleep(60);
  expect(onEnter).toHaveBeenCalledTimes(1);
  expect(onExit).not.toHaveBeenCalled();
  await sleep(150); // 210ms
  expect(onEnter).toHaveBeenCalledTimes(1);
  expect(onExit).toHaveBeenCalledTimes(1);
});

test('Should not call component methods if "options.cycles=false"', async () => {
  const onEnter = jest.fn();
  class ExampleComponent extends React.PureComponent {
    render () {
      return <div>{this.props.children}</div>; // eslint-disable-line react/prop-types
    }
    enter () {
      onEnter();
    }
  }
  const Example = withEnergy({ cycles: false })(ExampleComponent);
  render(<Example energy={{ duration: 50 }}>Hello</Example>);

  await sleep(60);
  expect(onEnter).not.toHaveBeenCalled();
});

test('Should set component default props', () => {
  class ExampleComponent extends React.PureComponent {
    render () {
      expect(this.props.energy.getDuration()).toMatchObject({ enter: 700 }); // eslint-disable-line react/prop-types
      return <div />;
    }
  }
  const options = { duration: { enter: 700 } };
  const Example = withEnergy(options)(ExampleComponent);
  render(<Example />);
});

test('Should set component default props and be extended by provided props', () => {
  class ExampleComponent extends React.PureComponent {
    render () {
      expect(this.props.energy.getDuration()).toMatchObject({ enter: 500 }); // eslint-disable-line react/prop-types
      return <div />;
    }
  }
  const options = { duration: { enter: 700 } };
  const Example = withEnergy(options)(ExampleComponent);
  render(<Example energy={{ duration: { enter: 500 } }} />);
});

test('Should accept functions as components when "cycles=false" and not referenced', () => {
  const ExampleComponent = () => <div />;
  const options = { cycles: false };
  const Example = withEnergy(options)(ExampleComponent);
  render(<Example />);
});
