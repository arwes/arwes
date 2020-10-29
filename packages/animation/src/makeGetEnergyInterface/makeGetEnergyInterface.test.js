/* eslint-env jest */

import { METHODS, makeGetEnergyInterface } from './makeGetEnergyInterface';

test('Should get energy interface API with flow and component methods', () => {
  const methods = {};
  METHODS.forEach(name => (methods[name] = { bind: jest.fn() }));
  const component = { type: 0, ...methods };
  const getEnergyInterface = makeGetEnergyInterface(component);
  const flowValue = 'entering';
  const energy = getEnergyInterface(flowValue);

  expect(energy).toEqual({
    type: 0,
    flow: { value: flowValue, [flowValue]: true }
  });
  METHODS.forEach(name => {
    const method = methods[name];
    expect(method.bind).toHaveBeenCalledWith(component);
  });
});

test('Should get energy interface API as immutable', () => {
  const methods = {};
  METHODS.forEach(name => (methods[name] = { bind: jest.fn() }));
  const component = { type: 0, ...methods };
  const getEnergyInterface = makeGetEnergyInterface(component);
  const energy = getEnergyInterface('entering');

  expect(() => (energy.a = true)).toThrow();
  expect(() => (energy.flow.value = true)).toThrow();
});
