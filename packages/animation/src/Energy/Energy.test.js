/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Energy } from './Energy';
import { useEnergy } from '../useEnergy';

afterEach(cleanup);

test('Should render', () => {
  render(<Energy />);
});

test('Should provide energy interface API as immutable', () => {
  function Example () {
    const energy = useEnergy();
    expect(energy).toMatchObject({
      flow: {
        value: 'exited',
        exited: true
      },
      getDuration: expect.any(Function),
      getDurationIn: expect.any(Function),
      getDurationOut: expect.any(Function),
      updateDuration: expect.any(Function),
      hasEntered: expect.any(Function),
      hasExited: expect.any(Function)
    });
    expect(() => (energy.a = true)).toThrow();
    expect(() => (energy.flow.value = true)).toThrow();
    return <div />;
  }
  render(<Energy><Example /></Energy>);
});

describe('getFlow()', () => {
  test('Should return current flow object', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} />);
    expect(energy.getFlow()).toEqual({ value: 'exited', exited: true });
  });

  test('Should return a frozen flow object', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} animate={false} />);
    const flow = energy.getFlow();
    expect(() => (flow.value = 'xxx')).toThrow();
  });
});

describe('getDuration()', () => {
  test('Should get duration', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} duration={100} />);
    expect(energy.getDuration()).toMatchObject({ enter: 100, exit: 100 });
  });
});

describe('getDurationIn()', () => {
  test('Should return duration to transition in', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} duration={{ enter: 100 }} />);
    expect(energy.getDurationIn()).toBe(100);
  });

  test('Should return duration to transition in with delay', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} duration={{ enter: 100, delay: 50 }} />);
    expect(energy.getDurationIn()).toBe(150);
  });
});

describe('getDurationOut()', () => {
  test('Should return duration to transition out', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} duration={{ exit: 100 }} />);
    expect(energy.getDurationOut()).toBe(100);
  });
});

describe('updateDuration()', () => {
  test('Should update duration', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} />);
    energy.updateDuration(70);
    expect(energy.getDuration()).toMatchObject({ enter: 70, exit: 70 });
  });
});
