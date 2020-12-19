/* eslint-env jest */

import { mergeClassAndInstanceAnimatorSettings } from './mergeClassAndInstanceAnimatorSettings';

test('Should extend class and instance animator settings and filter unknown settings for animated component', () => {
  const useAnimateEntering: any = () => null;
  const useAnimateExiting: any = () => null;
  const classAnimator = {
    duration: 500,
    merge: true,
    useAnimateEntering,
    useAnimateExiting,
    x: 1,
    y: 2
  };
  const instanceAnimator = { duration: { exit: 300 }, root: true, merge: false };
  const received = mergeClassAndInstanceAnimatorSettings(classAnimator, instanceAnimator);
  const expected = {
    duration: {
      enter: 500,
      exit: 300
    },
    root: true,
    merge: false,
    useAnimateEntering,
    useAnimateExiting
  };
  expect(received).toEqual(expected);
});

test('Should extend class and instance durations', () => {
  const classAnimator = { duration: { exit: 300, stagger: 100 } };
  const instanceAnimator = { duration: 400 };
  const received = mergeClassAndInstanceAnimatorSettings(classAnimator, instanceAnimator);
  const expected = { duration: { enter: 400, exit: 400, stagger: 100 } };
  expect(received).toEqual(expected);
});

test('Should not provide duration if not available in parameters', () => {
  const classAnimator = { root: true };
  const instanceAnimator = { root: false };
  const received = mergeClassAndInstanceAnimatorSettings(classAnimator, instanceAnimator);
  const expected = { root: false };
  expect(received).toEqual(expected);
});
