/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Stream } from './Stream';
import { Energy } from '../Energy';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  cleanup();
});

test('Should set energy flow as "entered" if no "animate"', () => {
  let energy;
  render(<Stream ref={r => (energy = r)} animate={false} />);
  expect(energy.getFlow().entered).toBeTruthy();
  jest.advanceTimersByTime(10);
  expect(energy.getFlow().entered).toBeTruthy();
});

test('Should get notified with "onActivation" when activation changes', () => {
  let example;
  const onActivation = jest.fn();
  class Example extends React.PureComponent {
    state = { activate: true }
    render () {
      const { activate } = this.state;
      return <Stream activate={activate} duration={100} onActivation={onActivation} />;
    }
  }
  render(<Example ref={r => (example = r)} />);
  setTimeout(() => example.setState({ activate: false }), 200);

  expect(onActivation).not.toHaveBeenCalled();

  jest.advanceTimersByTime(10);
  expect(onActivation).toHaveBeenCalledTimes(1);
  expect(onActivation).toHaveBeenCalledWith(true);

  jest.advanceTimersByTime(180); // 190ms
  expect(onActivation).toHaveBeenCalledTimes(1);

  jest.advanceTimersByTime(20); // 210ms
  expect(onActivation).toHaveBeenCalledTimes(2);
  expect(onActivation).toHaveBeenCalledWith(false);

  jest.advanceTimersByTime(100); // 310ms
  expect(onActivation).toHaveBeenCalledTimes(2);
});

test('Should exit animate children at the same time', () => {
  let example, stream, energy1, energy2, energy3;
  class Example extends React.PureComponent {
    state = { activate: true }
    render () {
      const { activate } = this.state;
      return (
        <Stream ref={r => (stream = r)} activate={activate}>
          <Energy ref={r => (energy1 = r)} duration={100} />
          <Energy ref={r => (energy2 = r)} duration={100} />
          <Energy ref={r => (energy3 = r)} duration={100} />
        </Stream>
      );
    }
  }
  render(<Example ref={r => (example = r)} />);
  setTimeout(() => (example.setState({ activate: false })), 400);

  jest.advanceTimersByTime(390);
  expect(stream.getFlow().entered).toBeTruthy();
  expect(energy1.getFlow().entered).toBeTruthy();
  expect(energy2.getFlow().entered).toBeTruthy();
  expect(energy3.getFlow().entered).toBeTruthy();

  jest.advanceTimersByTime(20); // 410ms
  expect(stream.getFlow().exiting).toBeTruthy();
  expect(energy1.getFlow().exiting).toBeTruthy();
  expect(energy2.getFlow().exiting).toBeTruthy();
  expect(energy3.getFlow().exiting).toBeTruthy();

  jest.advanceTimersByTime(100); // 510ms
  expect(stream.getFlow().exited).toBeTruthy();
  expect(energy1.getFlow().exited).toBeTruthy();
  expect(energy2.getFlow().exited).toBeTruthy();
  expect(energy3.getFlow().exited).toBeTruthy();
});

test('Should be able to nest Stream components', () => {
  let stream1, stream2, energy1, energy2, energy3, energy4;
  render(
    <Stream ref={r => (stream1 = r)} serial>
      <Energy ref={r => (energy1 = r)} duration={100} />
      <Stream ref={r => (stream2 = r)} serial> {/* duration.enter: 200 */}
        <Energy ref={r => (energy2 = r)} duration={100} />
        <Energy ref={r => (energy3 = r)} duration={100} />
      </Stream>
      <Energy ref={r => (energy4 = r)} duration={100} />
    </Stream>
  );

  expect(stream1.getFlow().exited).toBeTruthy();
  expect(energy1.getFlow().exited).toBeTruthy();
  expect(stream2.getFlow().exited).toBeTruthy();
  expect(energy2.getFlow().exited).toBeTruthy();
  expect(energy3.getFlow().exited).toBeTruthy();
  expect(energy4.getFlow().exited).toBeTruthy();

  jest.advanceTimersByTime(10);
  expect(stream1.getFlow().entering).toBeTruthy();
  expect(energy1.getFlow().entering).toBeTruthy();
  expect(stream2.getFlow().exited).toBeTruthy();
  expect(energy2.getFlow().exited).toBeTruthy();
  expect(energy3.getFlow().exited).toBeTruthy();
  expect(energy4.getFlow().exited).toBeTruthy();

  jest.advanceTimersByTime(100); // 110ms
  expect(stream1.getFlow().entering).toBeTruthy();
  expect(energy1.getFlow().entered).toBeTruthy();
  expect(stream2.getFlow().entering).toBeTruthy();
  expect(energy2.getFlow().entering).toBeTruthy();
  expect(energy3.getFlow().exited).toBeTruthy();
  expect(energy4.getFlow().exited).toBeTruthy();

  jest.advanceTimersByTime(100); // 210ms
  expect(stream1.getFlow().entering).toBeTruthy();
  expect(energy1.getFlow().entered).toBeTruthy();
  expect(stream2.getFlow().entering).toBeTruthy();
  expect(energy2.getFlow().entered).toBeTruthy();
  expect(energy3.getFlow().entering).toBeTruthy();
  expect(energy4.getFlow().exited).toBeTruthy();

  jest.advanceTimersByTime(100); // 310ms
  expect(stream1.getFlow().entering).toBeTruthy();
  expect(energy1.getFlow().entered).toBeTruthy();
  expect(stream2.getFlow().entered).toBeTruthy();
  expect(energy2.getFlow().entered).toBeTruthy();
  expect(energy3.getFlow().entered).toBeTruthy();
  expect(energy4.getFlow().entering).toBeTruthy();

  jest.advanceTimersByTime(100); // 410ms
  expect(stream1.getFlow().entered).toBeTruthy();
  expect(energy1.getFlow().entered).toBeTruthy();
  expect(stream2.getFlow().entered).toBeTruthy();
  expect(energy2.getFlow().entered).toBeTruthy();
  expect(energy3.getFlow().entered).toBeTruthy();
  expect(energy4.getFlow().entered).toBeTruthy();
});

describe('staggering mode', () => {
  test('Should enter animate staggering children nodes', () => {
    let stream, energy1, energy2, energy3;
    render(
      <Stream ref={r => (stream = r)} duration={{ stagger: 50 }}>
        <Energy ref={r => (energy1 = r)} duration={100} />
        <Energy ref={r => (energy2 = r)} duration={100} />
        <Energy ref={r => (energy3 = r)} duration={100} />
      </Stream>
    );

    expect(stream.getFlow().exited).toBeTruthy();
    expect(energy1.getFlow().exited).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(10);
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entering).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(50); // 60ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entering).toBeTruthy();
    expect(energy2.getFlow().entering).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(50); // 110ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entering).toBeTruthy();
    expect(energy3.getFlow().entering).toBeTruthy();

    jest.advanceTimersByTime(50); // 160ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entered).toBeTruthy();
    expect(energy3.getFlow().entering).toBeTruthy();

    jest.advanceTimersByTime(50); // 210ms
    expect(stream.getFlow().entered).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entered).toBeTruthy();
    expect(energy3.getFlow().entered).toBeTruthy();
  });

  test('Should enter animate staggering children nodes with duration offsets', () => {
    let stream, energy1, energy2, energy3;
    render(
      <Stream ref={r => (stream = r)} duration={{ stagger: 50 }}>
        <Energy ref={r => (energy1 = r)} duration={{ enter: 100 }} />
        <Energy ref={r => (energy2 = r)} duration={{ enter: 100, offset: 100 }} />
        <Energy ref={r => (energy3 = r)} duration={{ enter: 100 }} />
      </Stream>
    );

    expect(stream.getFlow().exited).toBeTruthy();
    expect(energy1.getFlow().exited).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(10);
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entering).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(150); // 160ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entering).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(50); // 210ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entering).toBeTruthy();
    expect(energy3.getFlow().entering).toBeTruthy();

    jest.advanceTimersByTime(50); // 260ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entered).toBeTruthy();
    expect(energy3.getFlow().entering).toBeTruthy();

    jest.advanceTimersByTime(50); // 310ms
    expect(stream.getFlow().entered).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entered).toBeTruthy();
    expect(energy3.getFlow().entered).toBeTruthy();
  });

  test('Should enter animate staggering children nodes with node delay and no effect of item delays', () => {
    let stream, energy1, energy2, energy3;
    render(
      <Stream ref={r => (stream = r)} duration={{ stagger: 50, delay: 50 }}>
        <Energy ref={r => (energy1 = r)} duration={{ enter: 100, delay: 0 }} />
        <Energy ref={r => (energy2 = r)} duration={{ enter: 100, delay: 100 }} />
        <Energy ref={r => (energy3 = r)} duration={{ enter: 100, delay: 0 }} />
      </Stream>
    );

    expect(stream.getFlow().exited).toBeTruthy();
    expect(energy1.getFlow().exited).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(10);
    expect(stream.getFlow().exited).toBeTruthy();
    expect(energy1.getFlow().exited).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(50); // 60ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entering).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(50); // 110ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entering).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(50); // 160ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().entering).toBeTruthy();

    jest.advanceTimersByTime(50); // 210ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entering).toBeTruthy();
    expect(energy3.getFlow().entering).toBeTruthy();

    jest.advanceTimersByTime(50); // 260ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entering).toBeTruthy();
    expect(energy3.getFlow().entered).toBeTruthy();

    jest.advanceTimersByTime(50); // 310ms
    expect(stream.getFlow().entered).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entered).toBeTruthy();
    expect(energy3.getFlow().entered).toBeTruthy();
  });
});

describe('serial mode', () => {
  test('Should enter animate serial children nodes', () => {
    let stream, energy1, energy2, energy3;
    render(
      <Stream ref={r => (stream = r)} serial>
        <Energy ref={r => (energy1 = r)} duration={100} />
        <Energy ref={r => (energy2 = r)} duration={100} />
        <Energy ref={r => (energy3 = r)} duration={100} />
      </Stream>
    );

    expect(stream.getFlow().exited).toBeTruthy();
    expect(energy1.getFlow().exited).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(10);
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entering).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(100); // 110ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entering).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(100); // 210ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entered).toBeTruthy();
    expect(energy3.getFlow().entering).toBeTruthy();

    jest.advanceTimersByTime(100); // 310ms
    expect(stream.getFlow().entered).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entered).toBeTruthy();
    expect(energy3.getFlow().entered).toBeTruthy();
  });

  test('Should enter animate serial children nodes with duration offsets', () => {
    let stream, energy1, energy2, energy3;
    render(
      <Stream ref={r => (stream = r)} serial>
        <Energy ref={r => (energy1 = r)} duration={{ enter: 100 }} />
        <Energy ref={r => (energy2 = r)} duration={{ enter: 100, offset: 100 }} />
        <Energy ref={r => (energy3 = r)} duration={{ enter: 100 }} />
      </Stream>
    );

    expect(stream.getFlow().exited).toBeTruthy();
    expect(energy1.getFlow().exited).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(10);
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entering).toBeTruthy();
    expect(energy2.getFlow().exited).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(200); // 210ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entering).toBeTruthy();
    expect(energy3.getFlow().exited).toBeTruthy();

    jest.advanceTimersByTime(100); // 310ms
    expect(stream.getFlow().entering).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entered).toBeTruthy();
    expect(energy3.getFlow().entering).toBeTruthy();

    jest.advanceTimersByTime(100); // 410ms
    expect(stream.getFlow().entered).toBeTruthy();
    expect(energy1.getFlow().entered).toBeTruthy();
    expect(energy2.getFlow().entered).toBeTruthy();
    expect(energy3.getFlow().entered).toBeTruthy();
  });
});

describe('hasEntered()', () => {
  test('Should return true if it has been in "entered" at least once', () => {
    let stream;
    render(
      <Stream ref={r => (stream = r)}>
        <Energy duration={100} />
      </Stream>
    );
    jest.advanceTimersByTime(10);
    expect(stream.hasEntered()).toBe(false);
    jest.advanceTimersByTime(100); // 110ms
    expect(stream.hasEntered()).toBe(true);
  });
});

describe('hasExited()', () => {
  test('Should return true if it has been in "exited" at least once', () => {
    let stream;
    let example;
    class Example extends React.PureComponent {
      state = { activate: true };
      render () {
        const { activate } = this.state;
        return (
          <Stream ref={r => (stream = r)} activate={activate}>
            <Energy duration={100} />
          </Stream>
        );
      }
    }
    render(<Example ref={r => (example = r)} />);
    setTimeout(() => example.setState({ activate: false }), 200);

    jest.advanceTimersByTime(10);
    expect(stream.hasExited()).toBe(false);

    jest.advanceTimersByTime(100); // 110ms
    expect(stream.hasExited()).toBe(false);

    jest.advanceTimersByTime(100); // 210ms
    expect(stream.hasExited()).toBe(false);

    jest.advanceTimersByTime(100); // 310ms
    expect(stream.hasExited()).toBe(true);
  });
});
