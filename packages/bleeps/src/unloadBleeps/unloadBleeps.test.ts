/* eslint-env jest */

import { createBleep } from '../createBleep';
import { unloadBleeps } from './unloadBleeps';

test('Should unload all provided bleeps', () => {
  const x = createBleep({}, { src: ['x.mp3'] });
  const y = createBleep({}, { src: ['y.mp3'] });
  const xUnload = jest.spyOn(x, 'unload');
  const yUnload = jest.spyOn(y, 'unload');
  const bleeps = { x, y };
  unloadBleeps(bleeps);
  expect(xUnload).toHaveBeenCalled();
  expect(yUnload).toHaveBeenCalled();
  expect(bleeps).toEqual({});
});
