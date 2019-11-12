/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Stream } from './Stream';
import { Energy } from '../Energy';
import { useEnergy } from '../useEnergy';

afterEach(cleanup);

test('Should render', () => {
  render(<Stream />);
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
      updateDuration: expect.any(Function),
      hasEntered: expect.any(Function),
      hasExited: expect.any(Function)
    });
    expect(() => (energy.a = true)).toThrow();
    expect(() => (energy.flow.value = true)).toThrow();
    return <div />;
  }
  render(<Stream><Example /></Stream>);
});

describe('getFlow()', () => {
  test('Should return current flow object', () => {
    let stream;
    render(<Stream ref={r => (stream = r)} />);
    expect(stream.getFlow()).toEqual({ value: 'exited', exited: true });
  });

  test('Should return a frozen flow object', () => {
    let stream;
    render(<Stream ref={r => (stream = r)} animate={false} />);
    const flow = stream.getFlow();
    expect(() => (flow.value = 'xxx')).toThrow();
  });
});

describe('duration', () => {
  test('Should get duration enter/exit as 0ms when no children nodes', () => {
    let stream;
    render(<Stream ref={r => (stream = r)} duration={{ stagger: 50 }} />);
    expect(stream.getDuration()).toMatchObject({ enter: 0, exit: 0 });
  });

  test('Should get duration enter with nodes in staggering mode calculating the total time', () => {
    let stream;
    render(
      <Stream ref={r => (stream = r)} duration={{ stagger: 50 }}>
        <Energy duration={100} />
        <Energy duration={100} />
        <Energy duration={100} />
      </Stream>
    );
    expect(stream.getDuration()).toMatchObject({ enter: 200 });
  });

  test('Should get duration enter with nodes in serial mode calculating the total time', () => {
    let stream;
    render(
      <Stream ref={r => (stream = r)} serial>
        <Energy duration={100} />
        <Energy duration={100} />
        <Energy duration={100} />
      </Stream>
    );
    expect(stream.getDuration()).toMatchObject({ enter: 300 });
  });

  test('Should get duration exit with the longest child exit time', () => {
    let stream;
    render(
      <Stream ref={r => (stream = r)}>
        <Energy duration={{ exit: 100 }} />
        <Energy duration={{ exit: 120 }} />
        <Energy duration={{ exit: 110 }} />
      </Stream>
    );
    expect(stream.getDuration()).toMatchObject({ exit: 120 });
  });

  test('Should update duration', () => {
    let stream;
    render(<Stream ref={r => (stream = r)} />);
    stream.updateDuration({ delay: 700 });
    expect(stream.getDuration()).toMatchObject({ delay: 700, stagger: 50 });
  });
});
