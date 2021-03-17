/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';

import { Bleeps } from '../constants';
import { BleepsProvider } from '../BleepsProvider';
import { useBleeps } from './useBleeps';

afterEach(cleanup);

test('Should provide empty bleeps if provided bleeps setup was not found', () => {
  let bleeps: Bleeps | undefined;
  const Example: FC = () => {
    bleeps = useBleeps();
    return null;
  };
  render(<Example />);
  expect(bleeps).toEqual({});
});

test('Should provide bleeps if provider bleeps setup was found', () => {
  let bleeps: Bleeps | undefined;
  const Example: FC = () => {
    bleeps = useBleeps();
    return null;
  };
  const audioSettings = { common: {}, categories: {} };
  const playersSettings = { click: { src: ['click.webm'] } };
  const bleepsSettings = { click: { player: 'click' } };
  render(
    <BleepsProvider
      audioSettings={audioSettings}
      playersSettings={playersSettings}
      bleepsSettings={bleepsSettings}
    >
      <Example />
    </BleepsProvider>
  );
  expect(bleeps && Object.keys(bleeps)).toEqual(['click']);
  // The actual bleeps API is not tested but rather their final settings.
  expect(bleeps).toMatchObject({
    click: { _settings: { src: ['click.webm'] } }
  });
});

// TODO: Test how the bleeps generics are converted into component bleeps.
