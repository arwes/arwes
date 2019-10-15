/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Energy } from './Energy';
import { EnergyContext } from '../EnergyContext';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  cleanup();
});

test('Should set energy flow as "entered" if no "animate"', () => {
  let energy;
  render(<Energy ref={r => (energy = r)} animate={false} />);
  expect(energy.state.flow.entered).toBe(true);
  jest.advanceTimersByTime(10);
  expect(energy.state.flow.entered).toBe(true);
});

test('Should delay energy flow from "exited" the "duration.delay" time', () => {
  let energy;
  render(<Energy ref={r => (energy = r)} duration={{ enter: 100, delay: 100 }} />);
  expect(energy.state.flow.exited).toBe(true);
  jest.advanceTimersByTime(90);
  expect(energy.state.flow.exited).toBe(true);
  jest.advanceTimersByTime(20); // 110ms
  expect(energy.state.flow.entering).toBe(true);
});

test('Should get notified with "onActivate" when activation changes', () => {
  let example;
  const onActivate = jest.fn();
  class Example extends React.PureComponent {
    state = { activate: true }
    render () {
      const { activate } = this.state;
      return <Energy activate={activate} duration={100} onActivate={onActivate} />;
    }
  }
  render(<Example ref={r => (example = r)} />);
  setTimeout(() => example.setState({ activate: false }), 200);

  expect(onActivate).not.toHaveBeenCalled();

  jest.advanceTimersByTime(10);
  expect(onActivate).toHaveBeenCalledTimes(1);
  expect(onActivate).toHaveBeenCalledWith(true);

  jest.advanceTimersByTime(180); // 190ms
  expect(onActivate).toHaveBeenCalledTimes(1);

  jest.advanceTimersByTime(20); // 210ms
  expect(onActivate).toHaveBeenCalledTimes(2);
  expect(onActivate).toHaveBeenCalledWith(false);

  jest.advanceTimersByTime(100); // 310ms
  expect(onActivate).toHaveBeenCalledTimes(2);
});

describe('root', () => {
  test('Should set energy flow as "exited" if "activate", and start "entering"', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} />);
    expect(energy.state.flow.exited).toBe(true);
    jest.advanceTimersByTime(10);
    expect(energy.state.flow.entering).toBe(true);
  });

  test('Should "activate" set energy flow', () => {
    let example;
    let energy;
    class Example extends React.PureComponent {
      state = { activate: false }
      render () {
        const { activate } = this.state;
        return <Energy ref={r => (energy = r)} duration={100} activate={activate} />;
      }
    }
    render(<Example ref={ref => (example = ref)} />);
    setTimeout(() => example.setState({ activate: true }), 50);
    setTimeout(() => example.setState({ activate: false }), 200);

    expect(energy.state.flow.exited).toBe(true);
    jest.advanceTimersByTime(10); // 10ms
    expect(energy.state.flow.exited).toBe(true);
    jest.advanceTimersByTime(50); // 60ms
    expect(energy.state.flow.entering).toBe(true);
    jest.advanceTimersByTime(100); // 160ms
    expect(energy.state.flow.entered).toBe(true);
    jest.advanceTimersByTime(100); // 260ms
    expect(energy.state.flow.exiting).toBe(true);
    jest.advanceTimersByTime(50); // 310ms
    expect(energy.state.flow.exited).toBe(true);
  });
});

describe('parent energy', () => {
  test('Should not "activate" set energy flow', () => {
    let example;
    let energy;
    class Example extends React.PureComponent {
      state = { activate: false }
      render () {
        const { activate } = this.state;
        return (
          <EnergyContext.Provider value={{ flow: {} }}>
            <Energy ref={r => (energy = r)} duration={100} activate={activate} />
          </EnergyContext.Provider>
        );
      }
    }
    render(<Example ref={r => (example = r)} />);
    setTimeout(() => example.setState({ activate: true }), 50);
    setTimeout(() => example.setState({ activate: false }), 200);

    jest.advanceTimersByTime(10); // 10ms
    expect(energy.state.flow.exited).toBe(true);
    jest.advanceTimersByTime(50); // 60ms
    expect(energy.state.flow.exited).toBe(true);
    jest.advanceTimersByTime(200); // 260ms
    expect(energy.state.flow.exited).toBe(true);
  });

  test('Should parent energy context set energy flow', () => {
    let example;
    let energy;
    class Example extends React.PureComponent {
      state = { flow: { exited: true } }
      render () {
        const { flow } = this.state;
        return (
          <EnergyContext.Provider value={{ flow }}>
            <Energy ref={r => (energy = r)} duration={100} />
          </EnergyContext.Provider>
        );
      }
    }
    render(<Example ref={r => (example = r)} />);
    setTimeout(() => example.setState({ flow: { entering: true } }), 100);
    setTimeout(() => example.setState({ flow: { entered: true } }), 200);
    setTimeout(() => example.setState({ flow: { exiting: true } }), 500);
    setTimeout(() => example.setState({ flow: { exited: true } }), 600);

    jest.advanceTimersByTime(10); // 10ms
    expect(energy.state.flow.exited).toBe(true);

    jest.advanceTimersByTime(100); // 110ms
    expect(energy.state.flow.exited).toBe(true);
    jest.advanceTimersByTime(100); // 210ms
    expect(energy.state.flow.entering).toBe(true);
    jest.advanceTimersByTime(100); // 310ms
    expect(energy.state.flow.entered).toBe(true);

    // It should be "exiting" when its parent is "exiting".
    jest.advanceTimersByTime(200); // 510ms
    expect(energy.state.flow.exiting).toBe(true);
    jest.advanceTimersByTime(100); // 610ms
    expect(energy.state.flow.exited).toBe(true);
  });

  test('Should parent energy context set energy flow to enter if "entering" or "entered" if "merge=true"', () => {
    let example;
    let energy;
    class Example extends React.PureComponent {
      state = { flow: { exited: true } }
      render () {
        const { flow } = this.state;
        return (
          <EnergyContext.Provider value={{ flow }}>
            <Energy ref={r => (energy = r)} duration={100} merge />
          </EnergyContext.Provider>
        );
      }
    }
    render(<Example ref={r => (example = r)} />);
    setTimeout(() => example.setState({ flow: { entering: true } }), 100);
    setTimeout(() => example.setState({ flow: { entered: true } }), 200);
    setTimeout(() => example.setState({ flow: { exiting: true } }), 400);
    setTimeout(() => example.setState({ flow: { exited: true } }), 500);

    jest.advanceTimersByTime(10); // 10ms
    expect(energy.state.flow.exited).toBe(true);

    jest.advanceTimersByTime(100); // 110ms
    expect(energy.state.flow.entering).toBe(true);
    jest.advanceTimersByTime(100); // 210ms
    expect(energy.state.flow.entered).toBe(true);

    // It should be "exiting" when its parent is "exiting".
    jest.advanceTimersByTime(200); // 410ms
    expect(energy.state.flow.exiting).toBe(true);
    jest.advanceTimersByTime(100); // 510ms
    expect(energy.state.flow.exited).toBe(true);
  });
});
