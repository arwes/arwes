/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Energy } from './Energy';
import { AnimationProvider } from '../AnimationProvider';
import { EnergyContext } from '../EnergyContext';

afterEach(cleanup);

test('Should render', () => {
  render(<Energy />);
});

describe('isAnimate()', () => {
  test('Should return true by default with no animation context', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} />);
    expect(energy.isAnimate()).toBe(true);
  });

  test('Should return false if provided with no animation context', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} animate={false} />);
    expect(energy.isAnimate()).toBe(false);
  });

  test('Should return false if animation context says so', () => {
    let energy;
    render(
      <AnimationProvider animate={false}>
        <Energy ref={r => (energy = r)} />
      </AnimationProvider>
    );
    expect(energy.isAnimate()).toBe(false);
  });

  test('Should prop be imperative over animation context', () => {
    let energy;
    render(
      <AnimationProvider animate={false}>
        <Energy ref={r => (energy = r)} animate />
      </AnimationProvider>
    );
    expect(energy.isAnimate()).toBe(true);
  });
});

describe('isRoot()', () => {
  test('Should return true by default with no parent energy context', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} />);
    expect(energy.isRoot()).toBe(true);
  });

  test('Should return false if parent energy context', () => {
    let energy;
    render(
      <EnergyContext.Provider value={{ flow: {} }}>
        <Energy ref={r => (energy = r)} />
      </EnergyContext.Provider>
    );
    expect(energy.isRoot()).toBe(false);
  });

  test('Should prop be imperative over parent energy context', () => {
    let energy;
    render(
      <EnergyContext.Provider value={{ flow: {} }}>
        <Energy ref={r => (energy = r)} root />
      </EnergyContext.Provider>
    );
    expect(energy.isRoot()).toBe(true);
  });
});

describe('getDuration()', () => {
  test('Should return 200ms for enter/exit and 0ms for delay by default', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} />);
    expect(energy.getDuration()).toMatchObject({ enter: 200, exit: 200, delay: 0 });
  });

  test('Should duration be extended by animation context', () => {
    let energy;
    render(
      <AnimationProvider duration={{ exit: 500 }}>
        <Energy ref={r => (energy = r)} />
      </AnimationProvider>
    );
    expect(energy.getDuration()).toMatchObject({ enter: 200, exit: 500 });
  });

  test('Should duration be extended by animation context and prop', () => {
    let energy;
    render(
      <AnimationProvider duration={{ enter: 700, exit: 500, delay: 50 }}>
        <Energy ref={r => (energy = r)} duration={{ exit: 700 }} />
      </AnimationProvider>
    );
    expect(energy.getDuration()).toMatchObject({ enter: 700, exit: 700, delay: 50 });
  });

  test('Should set enter/exit values with provided number', () => {
    let energy;
    render(
      <AnimationProvider duration={{ enter: 500, exit: 500 }}>
        <Energy ref={r => (energy = r)} duration={250} />
      </AnimationProvider>
    );
    expect(energy.getDuration()).toMatchObject({ enter: 250, exit: 250 });
  });
});

describe('isActivated()', () => {
  test('Should return true if root by default', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} />);
    expect(energy.isActivated()).toBe(true);
  });

  test('Should return prop value if root', () => {
    let energy;
    render(<Energy ref={r => (energy = r)} activate={false} />);
    expect(energy.isActivated()).toBe(false);
  });

  test('Should return false if parent energy flow is "entered"', () => {
    let energy;
    render(
      <EnergyContext.Provider value={{ flow: {} }}>
        <Energy ref={r => (energy = r)} />
      </EnergyContext.Provider>
    );
    expect(energy.isActivated()).toBe(false);
  });

  test('Should return false if parent energy flow is not "entered"', () => {
    let energy;
    render(
      <EnergyContext.Provider value={{ flow: { entered: true } }}>
        <Energy ref={r => (energy = r)} />
      </EnergyContext.Provider>
    );
    expect(energy.isActivated()).toBe(true);
  });
});
