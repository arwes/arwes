/* eslint-env jest */

import { STREAM } from '../constants';
import { makeIsOutsourced } from './makeIsOutsourced';

test('Should return false by default', () => {
  const component = {
    props: {},
    isRoot: jest.fn(() => false)
  };
  const isOutsourced = makeIsOutsourced(component);
  expect(isOutsourced()).toBe(false);
});

test('Should return false if root', () => {
  const component = {
    props: {},
    isRoot: jest.fn(() => true)
  };
  const isOutsourced = makeIsOutsourced(component);
  expect(isOutsourced()).toBe(false);
});

test('Should return true if imperative', () => {
  const component = {
    props: { imperative: true },
    isRoot: jest.fn(() => false)
  };
  const isOutsourced = makeIsOutsourced(component);
  expect(isOutsourced()).toBe(true);
});

test('Should return true if parent is stream', () => {
  const component = {
    props: { parentEnergyContext: { type: STREAM } },
    isRoot: jest.fn(() => false)
  };
  const isOutsourced = makeIsOutsourced(component);
  expect(isOutsourced()).toBe(true);
});
