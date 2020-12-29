/* eslint-env jest */

import React, { FC, useContext } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeErrorCatcher } from '../../test-utils/makeErrorCatcher';
import { BleepsSetup } from '../constants';
import { BleepsContext } from '../BleepsContext';
import { BleepsProvider } from './BleepsProvider.component';

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

test('Should render children and provide audio settings and player settings', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useContext(BleepsContext);
    return null;
  };
  const audio = {
    common: {
      volume: 0.7
    },
    categories: {
      transition: {
        volume: 0.5
      },
      notification: {
        volume: 1
      }
    }
  };
  const players = {
    click: {
      src: ['click.webm']
    },
    notification: {
      src: ['notification.webm'],
      loop: true
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

test('Should extend nested audio settings', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useContext(BleepsContext);
    return null;
  };
  const audio1 = {
    common: {
      volume: 0.7
    },
    categories: {
      transition: {
        volume: 0.5
      },
      notification: {
        volume: 1
      }
    }
  };
  const audio2 = {
    common: {
      volume: 0.8,
      rate: 0.5
    },
    categories: {
      transition: {
        preload: true
      }
    }
  };
  render(
    <BleepsProvider audio={audio1}>
      <div>
        <BleepsProvider audio={audio2}>
          <Example />
        </BleepsProvider>
      </div>
    </BleepsProvider>
  );
  const expectedAudio = {
    common: { // overwrited
      volume: 0.8,
      rate: 0.5
    },
    categories: {
      transition: { // partial extended
        volume: 0.5,
        preload: true
      },
      notification: { // untouched
        volume: 1
      }
    }
  };
  expect(bleepsSetup?.audioSettings).toEqual(expectedAudio);
});

test('Should extend nested players settings', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useContext(BleepsContext);
    return null;
  };
  const players1 = {
    click: {
      src: ['click.mp3'],
      rate: 1
    },
    notify: {
      src: ['notify.webm']
    }
  };
  const players2 = {
    click: {
      src: ['click.webm'],
      format: ['webm']
    },
    type: {
      src: ['type.webm'],
      loop: true
    }
  };
  render(
    <BleepsProvider players={players1}>
      <div>
        <BleepsProvider players={players2}>
          <Example />
        </BleepsProvider>
      </div>
    </BleepsProvider>
  );
  const expectedPlayers = {
    click: { // partial extended
      src: ['click.webm'],
      format: ['webm'],
      rate: 1
    },
    notify: { // only parent
      src: ['notify.webm']
    },
    type: { // only child
      src: ['type.webm'],
      loop: true
    }
  };
  expect(bleepsSetup?.playersSettings).toEqual(expectedPlayers);
});

test('Should throw error if audio categories are not valid', () => {
  const audio: any = {
    common: {
      volume: 0.7
    },
    categories: {
      xxx: {
        volume: 1
      }
    }
  };
  render(
    <mockErrorCatcher.Catcher>
      <BleepsProvider audio={audio}>
        <div />
      </BleepsProvider>
    </mockErrorCatcher.Catcher>
  );
  expect(mockErrorCatcher.error).toBeInstanceOf(Error);
  expect(mockErrorCatcher.error?.message).toBe('Bleep category "xxx" is not valid.');
  expect(mockConsoleError).toHaveBeenCalled();
});
