/* eslint-env jest */

import {
  BLEEPS_TRANSITION,
  BLEEPS_INTERACTION,
  BleepsSettings,
  BleepsSetup
} from '../../constants';
import { createOrUpdateBleeps } from './createOrUpdateBleeps';

test('Should create bleeps with common and category settings', () => {
  const audioSettings = {
    common: { volume: 0.9 },
    categories: {
      [BLEEPS_INTERACTION]: {
        volume: 0.5
      },
      [BLEEPS_TRANSITION]: {
        volume: 0.7
      }
    }
  };
  const playersSettings = {
    click: { src: ['click.webm'] },
    hover: { src: ['hover.webm'] },
    type: { src: ['type.webm'], loop: true }
  };
  const bleepsSetup: BleepsSetup = { audioSettings, playersSettings };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click' },
    hover: { player: 'hover', category: BLEEPS_INTERACTION },
    type: { player: 'type', category: BLEEPS_TRANSITION }
  };
  const bleeps = createOrUpdateBleeps({}, bleepsSetup, bleepsSettings);
  expect(Object.keys(bleeps)).toHaveLength(3);
  expect(bleeps.click).toMatchObject({
    _settings: { volume: 0.9, src: ['click.webm'] }
  });
  expect(bleeps.hover).toMatchObject({
    _settings: { volume: 0.5, src: ['hover.webm'] }
  });
  expect(bleeps.type).toMatchObject({
    _settings: { volume: 0.7, src: ['type.webm'], loop: true }
  });
});

test('Should create and update bleeps with common and category settings changes', () => {
  let bleeps: any;
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click' },
    hover: { player: 'hover', category: BLEEPS_INTERACTION }
  };

  const bleepsSetup1: BleepsSetup = {
    audioSettings: {
      common: { volume: 0.9 },
      categories: {
        [BLEEPS_INTERACTION]: { volume: 0.5 }
      }
    },
    playersSettings: {
      click: { src: ['click.webm'] },
      hover: { src: ['hover.webm'] }
    }
  };
  bleeps = createOrUpdateBleeps(bleeps, bleepsSetup1, bleepsSettings);

  expect(Object.keys(bleeps)).toHaveLength(2);
  expect(bleeps.click).toMatchObject({
    _settings: { volume: 0.9, src: ['click.webm'] }
  });
  expect(bleeps.hover).toMatchObject({
    _settings: { volume: 0.5, src: ['hover.webm'] }
  });

  const bleepsSetup2: BleepsSetup = {
    audioSettings: {
      common: { volume: 1 },
      categories: {
        [BLEEPS_INTERACTION]: { volume: 0.4 }
      }
    },
    playersSettings: {
      click: { src: ['click.webm'] },
      hover: { src: ['hover.webm'], loop: true }
    }
  };
  bleeps = createOrUpdateBleeps(bleeps, bleepsSetup2, bleepsSettings);

  expect(Object.keys(bleeps)).toHaveLength(2);
  expect(bleeps.click).toMatchObject({
    _settings: { volume: 1, src: ['click.webm'] }
  });
  expect(bleeps.hover).toMatchObject({
    _settings: { volume: 0.4, src: ['hover.webm'], loop: true }
  });
});

test('Should not create disabled common bleeps', () => {
  const audioSettings = {
    common: { disabled: true }
  };
  const playersSettings = {
    tap: { src: ['tap.webm'] }
  };
  const bleepsSetup: BleepsSetup = { audioSettings, playersSettings };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'tap' }
  };
  const bleeps = createOrUpdateBleeps({}, bleepsSetup, bleepsSettings);
  expect(bleeps).toEqual({});
});

test('Should not create disabled category bleeps', () => {
  const audioSettings = {
    categories: {
      [BLEEPS_TRANSITION]: { disabled: true }
    }
  };
  const playersSettings = {
    tap: { src: ['tap.webm'] }
  };
  const bleepsSetup: BleepsSetup = { audioSettings, playersSettings };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'tap', category: BLEEPS_TRANSITION }
  };
  const bleeps = createOrUpdateBleeps({}, bleepsSetup, bleepsSettings);
  expect(bleeps).toEqual({});
});

test('Should not create disabled players bleeps', () => {
  const audioSettings = {};
  const playersSettings = {
    tap: { src: ['tap.webm'], disabled: true }
  };
  const bleepsSetup: BleepsSetup = { audioSettings, playersSettings };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'tap' }
  };
  const bleeps = createOrUpdateBleeps({}, bleepsSetup, bleepsSettings);
  expect(bleeps).toEqual({});
});

test('Should unload and remove disabled category bleeps on update', () => {
  let bleeps: any;
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click', category: BLEEPS_INTERACTION }
  };

  const bleepsSetup1: BleepsSetup = {
    audioSettings: {
      common: { volume: 1 },
      categories: {
        [BLEEPS_INTERACTION]: { volume: 0.5 }
      }
    },
    playersSettings: {
      click: { src: ['click.webm'] }
    }
  };
  bleeps = createOrUpdateBleeps(bleeps, bleepsSetup1, bleepsSettings);
  expect(bleeps.click).toMatchObject({
    _settings: { volume: 0.5, src: ['click.webm'] }
  });

  const bleepsSetup2: BleepsSetup = {
    audioSettings: {
      common: { volume: 1 },
      categories: {
        [BLEEPS_INTERACTION]: { volume: 0.5, disabled: true }
      }
    },
    playersSettings: {
      click: { src: ['click.webm'] }
    }
  };
  const spyUnload = jest.spyOn(bleeps.click, 'unload');
  bleeps = createOrUpdateBleeps(bleeps, bleepsSetup2, bleepsSettings);
  expect(spyUnload).toHaveBeenCalled();
  expect(bleeps.click).toBeUndefined();
});

test('Should unload and remove disabled bleeps on update', () => {
  let bleeps: any;
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click' }
  };

  const bleepsSetup1: BleepsSetup = {
    audioSettings: {
      common: { volume: 1 }
    },
    playersSettings: {
      click: { src: ['click.webm'] }
    }
  };
  bleeps = createOrUpdateBleeps(bleeps, bleepsSetup1, bleepsSettings);
  expect(bleeps.click).toMatchObject({
    _settings: { volume: 1, src: ['click.webm'] }
  });

  const bleepsSetup2: BleepsSetup = {
    audioSettings: {
      common: { volume: 1 }
    },
    playersSettings: {
      click: { src: ['click.webm'], disabled: true }
    }
  };
  const spyUnload = jest.spyOn(bleeps.click, 'unload');
  bleeps = createOrUpdateBleeps(bleeps, bleepsSetup2, bleepsSettings);
  expect(spyUnload).toHaveBeenCalled();
  expect(bleeps.click).toBeUndefined();
});

test('Should throw error if configured bleep has no valid provided player', () => {
  const audioSettings = {};
  const playersSettings = {
    tap: { src: ['tap.webm'], disabled: true }
  };
  const bleepsSetup: BleepsSetup = { audioSettings, playersSettings };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click' } // player "click" does not exist
  };
  expect(() => {
    createOrUpdateBleeps({}, bleepsSetup, bleepsSettings);
  }).toThrow('Component bleep requires a provided player. Player "click" was not found.');
});

test('Should throw error if bleep category does not exist', () => {
  const audioSettings = {};
  const playersSettings = {
    tap: { src: ['tap.webm'], disabled: true }
  };
  const bleepsSetup: BleepsSetup = { audioSettings, playersSettings };
  const bleepsSettings: any = {
    click: { player: 'click', category: 'xxx' }
  };
  expect(() => {
    createOrUpdateBleeps({}, bleepsSetup, bleepsSettings);
  }).toThrow('Bleep category "xxx" is not valid.');
});
