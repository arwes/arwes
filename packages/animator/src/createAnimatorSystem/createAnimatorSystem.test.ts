/* eslint-env jest */

import type { AnimatorControl } from '../types';
import { ANIMATOR_DEFAULT_SETTINGS } from '../constants';
import { createAnimatorSystem } from './createAnimatorSystem';

test('Should create a system with predefined structure', () => {
  const system = createAnimatorSystem();
  expect(system).toEqual({
    id: expect.any(String),
    register: expect.any(Function),
    unregister: expect.any(Function)
  });
});

test('Should create system id with format "s#"', () => {
  const system = createAnimatorSystem();
  expect(system.id).toMatch(/^s\d+$/);
});

test('Should register new root node with predefined structure', () => {
  const system = createAnimatorSystem();
  const control: AnimatorControl = {
    getSettings: () => ANIMATOR_DEFAULT_SETTINGS,
    getDynamicSettings: () => ({}),
    setDynamicSettings: () => {},
    getForeignRef: () => {},
    setForeignRef: () => {}
  };
  const node = system.register(undefined, control);
  expect(node).toEqual({
    id: expect.any(String),
    control,
    parent: undefined,
    children: expect.any(Set),
    subscribers: expect.any(Set),
    scheduler: expect.any(Object),
    duration: {
      enter: expect.any(Number),
      exit: expect.any(Number)
    },
    state: ANIMATOR_DEFAULT_SETTINGS.initialState,
    subscribe: expect.any(Function),
    unsubscribe: expect.any(Function),
    send: expect.any(Function),
    manager: expect.any(Object)
  });
});

test('Should create node id with format "s#-n#" with parent system id', () => {
  const system = createAnimatorSystem();
  const control: AnimatorControl = {
    getSettings: () => ANIMATOR_DEFAULT_SETTINGS,
    getDynamicSettings: () => ({}),
    setDynamicSettings: () => {},
    getForeignRef: () => {},
    setForeignRef: () => {}
  };
  const node = system.register(undefined, control);
  expect(node.id).toMatch(/^s\d+-n\d+$/);
  expect(node.id.startsWith(system.id + '-')).toBeTruthy();
});
