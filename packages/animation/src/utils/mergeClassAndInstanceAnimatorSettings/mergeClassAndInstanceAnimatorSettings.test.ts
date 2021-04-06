/* eslint-env jest */

import { mergeClassAndInstanceAnimatorSettings } from './mergeClassAndInstanceAnimatorSettings';

test('Should extend class and instance animator settings and filter unknown settings for animated component', () => {
  const onAnimateEntering: any = () => null;
  const onAnimateExiting: any = () => null;
  const classAnimator = {
    duration: { enter: 500 },
    merge: true,
    onAnimateEntering,
    onAnimateExiting,
    x: 1,
    y: 2
  };
  const instanceAnimator = {
    duration: { exit: 300 },
    root: true,
    merge: false
  };
  const received = mergeClassAndInstanceAnimatorSettings(classAnimator, instanceAnimator);
  const expected = {
    duration: {
      enter: 500,
      exit: 300
    },
    root: true,
    merge: false,
    onAnimateEntering,
    onAnimateExiting
  };
  expect(received).toEqual(expected);
});

test('Should not provide duration if not available in parameters', () => {
  const classAnimator = { root: true };
  const instanceAnimator = { root: false };
  const received = mergeClassAndInstanceAnimatorSettings(classAnimator, instanceAnimator);
  const expected = { root: false };
  expect(received).toEqual(expected);
});
