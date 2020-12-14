/* eslint-env jest */

import { mergeClassAndInstanceAnimatorSettings } from './mergeClassAndInstanceAnimatorSettings';

test('Should extend class and instance animator settings and filter unknown settings for animated component', () => {
  const classAnimator = {
    duration: 500,
    merge: true,
    useAnimateEntering: 'a',
    useAnimateExiting: 'b',
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
    useAnimateEntering: 'a',
    useAnimateExiting: 'b'
  };
  expect(received).toEqual(expected);
});
