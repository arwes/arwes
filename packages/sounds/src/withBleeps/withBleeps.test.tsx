/* eslint-env jest */

import React, { FC } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeErrorCatcher } from '../../test-utils/makeErrorCatcher';
import {
  BLEEPS_TRANSITION,
  Bleeps,
  BleepsSettings
} from '../constants';
import { BleepsProvider } from '../BleepsProvider';
import { WithBleepsInputProps, withBleeps } from './withBleeps';

let mockConsoleError: any;
let mockErrorCatcher: any;

beforeEach(() => {
  mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
  mockErrorCatcher = makeErrorCatcher();
});

afterEach(() => {
  mockConsoleError.mockRestore();
  cleanup();
});

test('Should inject configured bleeps into wrapped component', () => {
  const audio = {
    common: { volume: 0.5 }
  };
  const players = {
    tap: { src: ['tap.webm'] }
  };
  let bleeps: Bleeps | undefined;
  const ExampleComponent: FC<WithBleepsInputProps> = props => {
    bleeps = props.bleeps;
    return null;
  };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'tap' }
  };
  const Example = withBleeps(bleepsSettings)(ExampleComponent);

  render(
    <BleepsProvider audio={audio} players={players}>
      <Example />
    </BleepsProvider>
  );
  expect(bleeps?.click).toMatchObject({
    _settings: {
      volume: 0.5,
      src: ['tap.webm']
    },
    play: expect.any(Function),
    pause: expect.any(Function),
    seek: expect.any(Function),
    stop: expect.any(Function),
    getIsPlaying: expect.any(Function),
    getDuration: expect.any(Function)
  });
  expect(Object.keys(bleeps || {})).toHaveLength(1);
});

test('Should inject common and category configured bleeps into wrapped component', () => {
  const audio = {
    common: { volume: 0.5 },
    categories: {
      [BLEEPS_TRANSITION]: { rate: 0.75 }
    }
  };
  const players = {
    tap: { src: ['tap.webm'] },
    type: { src: ['type.webm'], loop: true }
  };
  let bleeps: Bleeps | undefined;
  const ExampleComponent: FC<WithBleepsInputProps> = props => {
    bleeps = props.bleeps;
    return null;
  };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'tap' },
    typing: { player: 'type', category: BLEEPS_TRANSITION }
  };
  const Example = withBleeps(bleepsSettings)(ExampleComponent);

  render(
    <BleepsProvider audio={audio} players={players}>
      <Example />
    </BleepsProvider>
  );
  expect(bleeps?.click?.play).toBeInstanceOf(Function);
  expect(bleeps?.click?._settings).toEqual({
    volume: 0.5,
    src: ['tap.webm']
  });
  expect(bleeps?.typing?.play).toBeInstanceOf(Function);
  expect(bleeps?.typing?._settings).toEqual({
    volume: 0.5,
    rate: 0.75,
    loop: true,
    src: ['type.webm']
  });
});

test('Should extend class bleeps settings with instances bleeps settings allowing removals and editions', () => {
  const players = {
    click: { src: ['click.webm'] },
    hover: { src: ['hover.webm'] },
    type: { src: ['type.webm'] },
    notify: { src: ['notify.webm'] }
  };
  let bleeps: Bleeps | undefined;
  const ExampleComponent: FC<WithBleepsInputProps> = props => {
    bleeps = props.bleeps;
    return null;
  };
  const classBleepsSettings: BleepsSettings = {
    click: { player: 'click' },
    hover: { player: 'hover' },
    notify: { player: 'notify' }
  };
  const Example = withBleeps(classBleepsSettings)(ExampleComponent);
  const instanceBleepsSettings = {
    click: undefined, // Remove bleep if it was previosly defined.
    type: { player: 'type' },
    notify: { player: 'click' }
  };
  render(
    <BleepsProvider players={players}>
      <Example bleeps={instanceBleepsSettings} />
    </BleepsProvider>
  );
  expect(Object.keys(bleeps || {})).toHaveLength(3);
  expect(bleeps?.hover).toMatchObject({ _settings: { src: ['hover.webm'] } });
  expect(bleeps?.type).toMatchObject({ _settings: { src: ['type.webm'] } });
  expect(bleeps?.notify).toMatchObject({ _settings: { src: ['click.webm'] } });
});

test('Should throw error if there is not provider found', () => {
  const ExampleComponent: FC<WithBleepsInputProps> = () => null;
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click' }
  };
  const Example = withBleeps(bleepsSettings)(ExampleComponent);

  render(
    <mockErrorCatcher.Catcher>
      <Example />
    </mockErrorCatcher.Catcher>
  );
  expect(mockErrorCatcher.error).toBeInstanceOf(Error);
  expect(mockErrorCatcher.error?.message).toBe('Component with bleeps requires <BleepsProvider/> settings.');
  expect(mockConsoleError).toHaveBeenCalled();
});
