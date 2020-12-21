/* eslint-env jest */

import React, { FC, createRef, ReactNode } from 'react';
import { render, cleanup, act } from '@testing-library/react';

import { EXITED, ENTERING, AnimatorProvidedSettings } from '../constants';
import { extendAnimator } from './extendAnimator';
import { withAnimator } from '../withAnimator';

jest.useFakeTimers();
afterEach(cleanup);

test('Should extend actual animated component', () => {
  let flow: any;
  interface ExampleExtendAnimatorProps {
    animator: AnimatorProvidedSettings
  }
  const ExampleComponent: FC<ExampleExtendAnimatorProps> = props => {
    flow = props.animator.flow;
    return null;
  };
  const ExampleNode = withAnimator()(ExampleComponent);
  const ExampleExtendedNode = extendAnimator({})(ExampleNode);
  render(<ExampleExtendedNode />);
  expect(flow.value).toBe(EXITED);
  act(() => {
    jest.advanceTimersByTime(1);
  });
  expect(flow.value).toBe(ENTERING);
});

test('Should extend class animator settings and filter unknown settings for animated component', () => {
  let animator: any;
  const ExampleComponent: FC<any> = props => {
    animator = props.animator;
    return null;
  };
  const useAnimateEntering = (): void => {};
  const useAnimateExiting = (): void => {};
  const classAnimator = {
    duration: { enter: 500 },
    merge: true,
    useAnimateEntering,
    useAnimateExiting,
    x: 1,
    y: 2
  };
  const ExampleExtendedNode = extendAnimator(classAnimator)(ExampleComponent);
  render(<ExampleExtendedNode />);
  expect(animator).toEqual({
    duration: {
      enter: 500
    },
    merge: true,
    useAnimateEntering,
    useAnimateExiting
  });
});

test('Should extended class animator settings be extended by instance animator settings', () => {
  let animator: any;
  const ExampleComponent: FC<any> = props => {
    animator = props.animator;
    return null;
  };
  const classAnimator = { duration: { enter: 500 }, merge: true };
  const Wrapped = extendAnimator(classAnimator)(ExampleComponent);
  const instanceAnimator = { duration: { exit: 300 }, root: true };
  render(<Wrapped animator={instanceAnimator} />);
  expect(animator).toEqual({
    duration: {
      enter: 500,
      exit: 300
    },
    merge: true,
    root: true
  });
});

test('Should allow to pass ref to wrapped component', () => {
  class ToWrap extends React.Component<any> {
    render (): ReactNode {
      return null;
    }

    greet (): string {
      return 'hello';
    }
  }
  const Wrapped = extendAnimator({})(ToWrap);
  const ref = createRef<any>();
  render(<Wrapped ref={ref} />);
  expect(ref.current.greet()).toBe('hello');
});
