/* eslint-env jest */

import React, { createRef } from 'react';
import { render, cleanup } from '@testing-library/react';

import { extendAnimator } from './extendAnimator';

afterEach(cleanup);

test('Should extend class animator settings and filter unknown settings for animated component', () => {
  let animator;
  function ToWrap (props) {
    animator = props.animator;
    return null;
  }
  const classAnimator = {
    duration: 500,
    merge: true,
    useAnimateEntering: 'a',
    useAnimateExiting: 'b',
    x: 1,
    y: 2
  };
  const Wrapped = extendAnimator(classAnimator)(ToWrap);
  render(<Wrapped />);
  expect(animator).toEqual({
    duration: {
      enter: 500,
      exit: 500
    },
    merge: true,
    useAnimateEntering: 'a',
    useAnimateExiting: 'b'
  });
});

test('Should extended class animator settings be extended by instance animator settings', () => {
  let animator;
  function ToWrap (props) {
    animator = props.animator;
    return null;
  }
  const classAnimator = { duration: 500, merge: true };
  const Wrapped = extendAnimator(classAnimator)(ToWrap);
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
  class ToWrap extends React.Component {
    render () {
      return null;
    }

    greet () {
      return 'hello';
    }
  }
  const Wrapped = extendAnimator()(ToWrap);
  const ref = createRef();
  render(<Wrapped ref={ref} />);
  expect(ref.current.greet()).toBe('hello');
});
