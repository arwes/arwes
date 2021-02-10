/* eslint-env jest */

import { filterClassAnimatorSettings } from './filterClassAnimatorSettings';

test('Should filter unexpected class settings', () => {
  const received = filterClassAnimatorSettings({ a: 1, b: 2, x: true, y: false });
  const expected = {};
  expect(received).toEqual(expected);
});

test('Should filter flow activation values', () => {
  const received = filterClassAnimatorSettings({ activate: true, onTransition: () => {} });
  const expected = {};
  expect(received).toEqual(expected);
});

[
  'duration',
  'animate',
  'root',
  'merge',
  'combine',
  'manager',
  'useAnimateMount',
  'useAnimateEntering',
  'useAnimateEntered',
  'useAnimateExiting',
  'useAnimateExited',
  'useAnimateUnmount'
].forEach(propName => {
  test(`Should allow "${propName}" property`, () => {
    const received = filterClassAnimatorSettings({ [propName]: 123 });
    const expected = { [propName]: 123 };
    expect(received).toEqual(expected);
  });
});
