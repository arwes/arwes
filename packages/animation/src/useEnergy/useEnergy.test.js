/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { EnergyContext } from '../EnergyContext';
import { useEnergy } from './useEnergy';

afterEach(cleanup);

test('Should return null if no provider was found', () => {
  const expected = null;
  const Example = () => {
    const received = useEnergy();
    expect(received).toBe(expected);
    return <div />;
  };
  render(<Example />);
});

test('Should return provided data if provider was found', () => {
  const expected = 100;
  const Example = () => {
    const received = useEnergy();
    expect(received).toEqual(expected);
    return <div />;
  };
  render(
    <EnergyContext.Provider value={100}>
      <Example />
    </EnergyContext.Provider>
  );
});
