/* eslint-env jest */

import React, { FC, useContext } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeErrorCatcher } from '../../__testUtils__/makeErrorCatcher';
import type { BleepsSettings, BleepsSetup } from '../types';
import { BleepsContext } from '../BleepsContext';
import { BleepsProvider } from './BleepsProvider';

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

test('Should receive audio settings, players settings, and bleeps settings, and provide them and respective bleeps', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useContext(BleepsContext);
    return null;
  };
  const audioSettings = { common: { volume: 0.7 }, categories: {} };
  const playersSettings = { click: { src: ['click.webm'] } };
  const bleepsSettings: BleepsSettings = { tap: { player: 'click' } };
  render(
    <BleepsProvider
      settings={{
        audio: audioSettings,
        players: playersSettings,
        bleeps: bleepsSettings
      }}
    >
      <Example />
    </BleepsProvider>
  );
  expect(bleepsSetup?.settings.audio).toEqual(audioSettings);
  expect(bleepsSetup?.settings.players).toEqual(playersSettings);
  expect(bleepsSetup?.settings.bleeps).toEqual(bleepsSettings);

  // The actual bleeps API is not tested but rather then final settings.
  expect(bleepsSetup?.bleeps).toMatchObject({
    tap: {
      _settings: {
        src: ['click.webm'],
        volume: 0.7
      }
    }
  });
});

test('Should receive common and categories of audio settings, players settings, and bleeps settings, and provide them and respective bleeps', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useContext(BleepsContext);
    return null;
  };
  const audioSettings = {
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
  const playersSettings = {
    click: {
      src: ['click.webm']
    },
    typing: {
      src: ['typing.webm'],
      loop: true
    },
    notify: {
      src: ['notify.webm']
    }
  };
  const bleepsSettings: BleepsSettings = {
    click: {
      player: 'click',
      category: 'interaction'
    },
    typing: {
      player: 'typing',
      category: 'transition'
    },
    notify: {
      player: 'notify',
      category: 'notification'
    }
  };
  render(
    <BleepsProvider
      settings={{
        audio: audioSettings,
        players: playersSettings,
        bleeps: bleepsSettings
      }}
    >
      <Example />
    </BleepsProvider>
  );
  expect(bleepsSetup?.settings.audio).toEqual(audioSettings);
  expect(bleepsSetup?.settings.players).toEqual(playersSettings);
  expect(bleepsSetup?.settings.bleeps).toEqual(bleepsSettings);

  // The actual bleeps API is not tested but rather their final settings.
  expect(bleepsSetup?.bleeps).toMatchObject({
    click: {
      _settings: {
        src: ['click.webm'],
        volume: 0.7
      }
    },
    typing: {
      _settings: {
        src: ['typing.webm'],
        volume: 0.5,
        loop: true
      }
    },
    notify: {
      _settings: {
        src: ['notify.webm'],
        volume: 1
      }
    }
  });
});

test('Should extend nested audio settings', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useContext(BleepsContext);
    return null;
  };
  const audioSettings1 = {
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
  const audioSettings2 = {
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
    <BleepsProvider settings={{ audio: audioSettings1 }}>
      <div>
        <BleepsProvider settings={{ audio: audioSettings2 }}>
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
  expect(bleepsSetup?.settings.audio).toEqual(expectedAudio);
});

test('Should extend nested players settings', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useContext(BleepsContext);
    return null;
  };
  const playersSettings1 = {
    click: {
      src: ['click.mp3'],
      rate: 1
    },
    notify: {
      src: ['notify.webm']
    }
  };
  const playersSettings2 = {
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
    <BleepsProvider settings={{ players: playersSettings1 }}>
      <div>
        <BleepsProvider settings={{ players: playersSettings2 }}>
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
  expect(bleepsSetup?.settings.players).toEqual(expectedPlayers);
});

test('Should extend nested bleeps settings', () => {
  let bleepsSetup: BleepsSetup | undefined;
  const Example: FC = () => {
    bleepsSetup = useContext(BleepsContext);
    return null;
  };

  const playersSettings1 = {
    click: { src: ['click.mp3'] }
  };
  const bleepsSettings1 = {
    click: { player: 'click' }
  };

  const bleepsSettings2 = {
    hover: { player: 'hover' }
  };
  const playersSettings2 = {
    hover: { src: ['hover.mp3'] }
  };

  render(
    <BleepsProvider settings={{ players: playersSettings1, bleeps: bleepsSettings1 }}>
      <div>
        <BleepsProvider settings={{ players: playersSettings2, bleeps: bleepsSettings2 }}>
          <Example />
        </BleepsProvider>
      </div>
    </BleepsProvider>
  );
  const expectedBleepsSettings = {
    click: { player: 'click' },
    hover: { player: 'hover' }
  };
  expect(bleepsSetup?.settings.bleeps).toEqual(expectedBleepsSettings);
});

test('Should throw error if audio categories are not valid', () => {
  const audioSettings: any = {
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
      <BleepsProvider settings={{ audio: audioSettings }}>
        <div />
      </BleepsProvider>
    </mockErrorCatcher.Catcher>
  );
  expect(mockErrorCatcher.error).toBeInstanceOf(Error);
  expect(mockErrorCatcher.error?.message).toBe('Bleep category "xxx" is not valid.');
  expect(mockConsoleError).toHaveBeenCalled();
});
