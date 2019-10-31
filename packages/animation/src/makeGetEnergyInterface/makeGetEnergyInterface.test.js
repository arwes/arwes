/* eslint-env jest */

import { makeGetEnergyInterface } from './makeGetEnergyInterface';

test('Should get energy interface API with flow and component methods', () => {
  const component = {
    getDuration: 0,
    getDurationIn: 1,
    getDurationOut: 2,
    updateDuration: 3,
    hasEntered: 4,
    hasExited: 5
  };
  const getEnergyInterface = makeGetEnergyInterface(component);
  const flowValue = 'entering';
  const energy = getEnergyInterface(flowValue);

  expect(energy).toEqual({
    ...component,
    flow: {
      value: flowValue,
      [flowValue]: true
    }
  });
});

test('Should get energy interface API as immutable', () => {
  const component = {
    getDuration: 0,
    getDurationIn: 1,
    getDurationOut: 2,
    updateDuration: 3,
    hasEntered: 4,
    hasExited: 5
  };
  const getEnergyInterface = makeGetEnergyInterface(component);
  const energy = getEnergyInterface('entering');

  expect(() => (energy.a = true)).toThrow();
  expect(() => (energy.flow.value = true)).toThrow();
});
