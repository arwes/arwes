/* eslint-env jest */

import { makeIsRoot } from './makeIsRoot';

test('Should return true by default with no parent energy context', () => {
  const component = { props: {} };
  const isRoot = makeIsRoot(component);
  expect(isRoot()).toBe(true);
});

test('Should return false if parent energy context', () => {
  const component = { props: { parentEnergyContext: {} } };
  const isRoot = makeIsRoot(component);
  expect(isRoot()).toBe(false);
});

test('Should prop be imperative over parent energy context', () => {
  const component = { props: { parentEnergyContext: {}, root: true } };
  const isRoot = makeIsRoot(component);
  expect(isRoot()).toBe(true);
});
