/* eslint-env jest */

import { createBleep } from '../createBleep';
import { unloadBleep } from './unloadBleep';

test('Should unload provided bleeps bleep', () => {
  const x = createBleep({}, { src: ['x.mp3'] });
  const xUnload = jest.spyOn(x, 'unload');
  const bleeps = { x };
  unloadBleep(bleeps, 'x');
  expect(xUnload).toHaveBeenCalled();
  expect(bleeps).toEqual({});
});
