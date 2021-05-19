/* eslint-env jest */

import React, { FC, useContext } from 'react';
import { render, cleanup } from '@testing-library/react';

import { makeErrorCatcher } from '../../test-utils/makeErrorCatcher';
import { BleepsSettings, BleepsSetup } from '../constants';
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

  // The actual bleeps API is not tested but rather then final settings.
  expect(bleepsSetup?.bleepsGenerics).toMatchObject({
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

  // The actual bleeps API is not tested but rather their final settings.
  expect(bleepsSetup?.bleepsGenerics).toMatchObject({
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
    <BleepsProvider audioSettings={audioSettings1}>
      <div>
        <BleepsProvider audioSettings={audioSettings2}>
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
    <BleepsProvider playersSettings={playersSettings1}>
      <div>
        <BleepsProvider playersSettings={playersSettings2}>
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
    <BleepsProvider playersSettings={playersSettings1} bleepsSettings={bleepsSettings1}>
      <div>
        <BleepsProvider playersSettings={playersSettings2} bleepsSettings={bleepsSettings2}>
          <Example />
        </BleepsProvider>
      </div>
    </BleepsProvider>
  );
  const expectedBleepsSettings = {
    click: { player: 'click' },
    hover: { player: 'hover' }
  };
  expect(bleepsSetup?.bleepsSettings).toEqual(expectedBleepsSettings);
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
      <BleepsProvider audioSettings={audioSettings}>
        <div />
      </BleepsProvider>
    </mockErrorCatcher.Catcher>
  );
  expect(mockErrorCatcher.error).toBeInstanceOf(Error);
  expect(mockErrorCatcher.error?.message).toBe('Bleep category "xxx" is not valid.');
  expect(mockConsoleError).toHaveBeenCalled();
});
