/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';

import { BleepsSetup } from '../constants';
import { BleepsProvider } from '../BleepsProvider';
import { useBleeps } from './useBleeps';

afterEach(cleanup);

test('Should provide undefined if provided was not found', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useBleeps();
    return null;
  };
  render(<Example />);
  expect(bleepsSetup).toBeUndefined();
});

test('Should provide bleeps setup if provider was found', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useBleeps();
    return null;
  };
  const audio = {
    common: {
      volume: 0.7
    },
    categories: {
      notification: {
        volume: 1
      }
    }
  };
  const players = {
    click: {
      src: ['click.webm']
    }
  };
  render(
    <BleepsProvider audio={audio} players={players}>
      <Example />
    </BleepsProvider>
  );
  expect(bleepsSetup?.audioSettings).toEqual(audio);
  expect(bleepsSetup?.playersSettings).toEqual(players);
});
