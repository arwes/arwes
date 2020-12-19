/* eslint-env jest */

import { expandAnimatorDuration } from './expandAnimatorDuration';

test('Should return duration object', () => {
  const providedDuration = { enter: 150, exit: 150 };
  const received = expandAnimatorDuration(providedDuration);
  expect(providedDuration).toBe(received);
});

test('Should expand number value to "enter" and "exit" duration', () => {
  const received = expandAnimatorDuration(500);
  const expected = { enter: 500, exit: 500 };
  expect(received).toEqual(expected);
});
