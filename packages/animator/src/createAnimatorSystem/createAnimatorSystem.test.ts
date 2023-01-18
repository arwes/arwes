/* eslint-env jest */

import type { AnimatorControl } from '../types';
import { createAnimatorSystem } from './createAnimatorSystem';

test('Should create an empty animator system', () => {
  const system = createAnimatorSystem();
  expect(system).toEqual({
    id: expect.any(String),
    register: expect.any(Function),
    unregister: expect.any(Function)
  });
});

describe('setup()', () => {
  test.todo('Should throw if no machine is provided');

  test('Should setup new root', () => {
    const system = createAnimatorSystem();
    const settings: any = {
      machine: {}
    };
    const control: AnimatorControl = {
      getSettings: () => settings,
      setDynamicSettings: () => {},
      getForeignRef: () => {},
      setForeignRef: () => {}
    };
    system.register(undefined, control);
  });
});
