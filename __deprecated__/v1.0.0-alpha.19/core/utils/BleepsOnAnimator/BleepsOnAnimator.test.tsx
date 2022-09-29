/* eslint-env jest */

import React from 'react';
import { render, act, cleanup } from '@testing-library/react';
import { Animator } from '@arwes/animator';
import { useBleeps } from '@arwes/bleeps';

import { BleepsOnAnimator } from './index';

jest.useFakeTimers();

jest.mock('@arwes/bleeps', () => ({
  __esModule: true,
  useBleeps: jest.fn(() => ({}))
}));

let click: any;

beforeEach(() => {
  click = { play: jest.fn(), stop: jest.fn() };

  (useBleeps as any).mockReset();
  (useBleeps as any).mockImplementation(() => ({ click }));
});

afterEach(cleanup);

const advanceTime = (time: number): void => {
  act(() => {
    jest.advanceTimersByTime(time);
  });
};

test('Should play entering non-loop bleep when animator is entering once without stop', () => {
  render(
    <Animator>
      <BleepsOnAnimator entering={{ name: 'click' }} />
    </Animator>
  );
  expect(click.play).toHaveBeenCalledTimes(0);
  advanceTime(1);
  expect(click.play).toHaveBeenCalledTimes(1);
  advanceTime(100); // 101ms
  expect(click.play).toHaveBeenCalledTimes(1);
  expect(click.stop).not.toHaveBeenCalled();
});

test('Should play entering loop bleep when animator is entering and stop it on entered', () => {
  render(
    <Animator>
      <BleepsOnAnimator entering={{ name: 'click', loop: true }} />
    </Animator>
  );
  expect(click.play).toHaveBeenCalledTimes(0);
  expect(click.stop).toHaveBeenCalledTimes(0);
  advanceTime(1);
  expect(click.play).toHaveBeenCalledTimes(1);
  expect(click.stop).toHaveBeenCalledTimes(0);
  advanceTime(100); // 101ms
  expect(click.play).toHaveBeenCalledTimes(1);
  expect(click.stop).toHaveBeenCalledTimes(1);
});

test('Should play exiting non-loop bleep when animator is exiting once without stop', () => {
  const Example: React.FC = () => {
    const [activate, setActivate] = React.useState(true);

    React.useEffect(() => {
      const timeoutId = setTimeout(() => setActivate(false), 1000);
      return () => clearTimeout(timeoutId);
    }, []);

    return (
      <Animator animator={{ activate }}>
        <BleepsOnAnimator exiting={{ name: 'click' }} />
      </Animator>
    );
  };
  render(<Example />);
  advanceTime(999);
  expect(click.play).toHaveBeenCalledTimes(0);
  advanceTime(2); // 1001ms
  expect(click.play).toHaveBeenCalledTimes(1);
  advanceTime(100); // 1101ms
  expect(click.play).toHaveBeenCalledTimes(1);
  expect(click.stop).not.toHaveBeenCalled();
});

test('Should play exiting loop bleep when animator is exiting and stop it on exited', () => {
  const Example: React.FC = () => {
    const [activate, setActivate] = React.useState(true);

    React.useEffect(() => {
      const timeoutId = setTimeout(() => setActivate(false), 1000);
      return () => clearTimeout(timeoutId);
    }, []);

    return (
      <Animator animator={{ activate }}>
        <BleepsOnAnimator exiting={{ name: 'click', loop: true }} />
      </Animator>
    );
  };
  render(<Example />);

  // An animated component starts as EXITED, so it will stop the EXITING loop bleep
  // in this stage initially. Since it is not playing, this will do nothing.
  advanceTime(1);
  expect(click.stop).toHaveBeenCalledTimes(1);

  advanceTime(998); // 999ms
  expect(click.play).toHaveBeenCalledTimes(0);
  expect(click.stop).toHaveBeenCalledTimes(1);

  advanceTime(2); // 1001ms
  expect(click.play).toHaveBeenCalledTimes(1);
  expect(click.stop).toHaveBeenCalledTimes(1);

  advanceTime(100); // 1101ms
  expect(click.play).toHaveBeenCalledTimes(1);
  expect(click.stop).toHaveBeenCalledTimes(2); // Now it is actually stopped.
});
