/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';

import { BleepsSetup } from '../constants';
import { BleepsProvider } from '../BleepsProvider';
import { useBleepsSetup } from './useBleepsSetup';

afterEach(cleanup);

test('Should provide undefined if provided was not found', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useBleepsSetup();
    return null;
  };
  render(<Example />);
  expect(bleepsSetup).toBeUndefined();
});

test('Should provide bleeps setup if provider was found', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useBleepsSetup();
    return null;
  };
  const audioSettings = { common: { volume: 0.7 }, categories: {} };
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
  expect(bleepsSetup?.audioSettings).toEqual(audioSettings);
  expect(bleepsSetup?.playersSettings).toEqual(playersSettings);
  expect(bleepsSetup?.bleepsSettings).toEqual(bleepsSettings);
});
