/* eslint-env jest */

import { ENTERING, ENTERED, EXITING, EXITED } from '../constants';
import { makeIsActivated } from './makeIsActivated';

test('Should return true if root by default', () => {
  const isRoot = jest.fn(() => true);
  const component = { props: {}, isRoot };
  const isActivated = makeIsActivated(component);
  expect(isActivated()).toBe(true);
});

test('Should return prop value if root', () => {
  const isRoot = jest.fn(() => true);
  const component = { props: { activate: false }, isRoot };
  const isActivated = makeIsActivated(component);
  expect(isActivated()).toBe(false);
});

test('Should return true if parent energy flow is "entered"', () => {
  const isRoot = jest.fn(() => false);
  const component = { props: { parentEnergyContext: { flow: { entered: true } } }, isRoot };
  const isActivated = makeIsActivated(component);
  expect(isActivated()).toBe(true);
});

test('Should return true if "merge=true" parent energy flow is "entering"', () => {
  const isRoot = jest.fn(() => false);
  const component = { props: { merge: true, parentEnergyContext: { flow: { entering: true } } }, isRoot };
  const isActivated = makeIsActivated(component);
  expect(isActivated()).toBe(true);
});

test('Should return true if "merge=true" parent energy flow is "entered"', () => {
  const isRoot = jest.fn(() => false);
  const component = { props: { merge: true, parentEnergyContext: { flow: { entered: true } } }, isRoot };
  const isActivated = makeIsActivated(component);
  expect(isActivated()).toBe(true);
});

test('Should return false if parent energy flow is not "entered"', () => {
  const isRoot = jest.fn(() => false);
  const component = { props: { parentEnergyContext: { flow: {} } }, isRoot };
  const isActivated = makeIsActivated(component);
  expect(isActivated()).toBe(false);
});

[
  { flowValue: ENTERING, expected: true },
  { flowValue: ENTERED, expected: true },
  { flowValue: EXITING, expected: false },
  { flowValue: EXITED, expected: false }
].forEach(({ flowValue, expected }) => {
  test(`Should return ${expected} if "${flowValue}", not root, not parent energy`, () => {
    const isRoot = jest.fn(() => false);
    const component = { state: { flowValue }, props: {}, isRoot };
    const isActivated = makeIsActivated(component);
    expect(isActivated()).toBe(expected);
  });
});
