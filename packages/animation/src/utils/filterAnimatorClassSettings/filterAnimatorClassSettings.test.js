/* eslint-env jest */

import { filterAnimatorClassSettings } from './filterAnimatorClassSettings';

test('Should filter unexpected class settings', () => {
  const received = filterAnimatorClassSettings({ a: 1, b: 2, x: true, y: false });
  const expected = {};
  expect(received).toEqual(expected);
});

test('Should filter flow activation values', () => {
  const received = filterAnimatorClassSettings({ activate: true, onTransition: () => {} });
  const expected = {};
  expect(received).toEqual(expected);
});

['duration', 'animate', 'root', 'merge'].forEach(propName => {
  test(`Should allow "${propName}" property`, () => {
    const received = filterAnimatorClassSettings({ [propName]: 123 });
    const expected = { [propName]: 123 };
    expect(received).toEqual(expected);
  });
});
