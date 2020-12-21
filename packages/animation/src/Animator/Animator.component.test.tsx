/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup, act } from '@testing-library/react';

import { ENTERED, EXITED } from '../constants';
import { useAnimator } from '../useAnimator';
import { Animator } from './Animator.component';

jest.useFakeTimers();
afterEach(cleanup);

test('Should render', () => {
  render(<Animator />);
});

test('Should render children', () => {
  const rendered = jest.fn();
  const Example: FC = () => {
    rendered();
    return null;
  };
  render(<Animator><Example /></Animator>);
  expect(rendered).toHaveBeenCalled();
});

test('Should set flow "exited=true" and "hasExited=true" if "animate=true" (by default)', () => {
  let animator: any;
  const Example: FC = () => {
    animator = useAnimator();
    return null;
  };
  render(<Animator><Example /></Animator>);
  expect(animator.flow).toEqual({
    value: EXITED,
    [EXITED]: true,
    hasEntered: false,
    hasExited: true
  });
});

test('Should set flow "entered=true" and "hasEntered=true" always if "animate=false"', () => {
  let animator: any;
  const Example: FC = () => {
    animator = useAnimator();
    return null;
  };
  render(
    <Animator animator={{ animate: false }}>
      <Example />
    </Animator>
  );
  expect(animator.flow).toEqual({
    value: ENTERED,
    [ENTERED]: true,
    hasEntered: true,
    hasExited: false
  });
  act(() => {
    jest.advanceTimersByTime(10);
  });
  expect(animator.flow).toEqual({
    value: ENTERED,
    [ENTERED]: true,
    hasEntered: true,
    hasExited: false
  });
});

test('Should provide immutable data', () => {
  let animator: any;
  const Example: FC = () => {
    animator = useAnimator();
    return null;
  };
  render(<Animator><Example /></Animator>);
  expect(() => (animator.x = 1)).toThrow();
  expect(() => (animator.flow = 1)).toThrow();
  expect(() => (animator.flow.x = 1)).toThrow();
  expect(() => (animator.duration = 1)).toThrow();
  expect(() => (animator.duration.x = 1)).toThrow();
});
