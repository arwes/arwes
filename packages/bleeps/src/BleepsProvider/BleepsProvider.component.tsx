import React, { ReactNode, ReactElement, useContext, useState, useMemo } from 'react';

import type {
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSettings,
  BleepCategoryName,
  BleepsGenerics,
  BleepsSetup
} from '../types';
import { BLEEPS_CATEGORIES } from '../constants';
import { BleepsContext } from '../BleepsContext/index';
import { createOrUpdateBleeps } from '../utils/createOrUpdateBleeps/index';

interface BleepsProviderProps {
  settings: {
    audio?: BleepsAudioSettings
    players?: BleepsPlayersSettings
    bleeps?: BleepsSettings
  }
  children: ReactNode
}

const BleepsProvider = (props: BleepsProviderProps): ReactElement => {
  const parentSetup = useContext(BleepsContext);

  // The bleeps object reference is always kept to properly unload/remove/update
  // current playing bleeps before settings updates.
  // Also, bleeps can not be extended in multiple providers to independently
  // manage them by each provider in the tree.
  const [bleepsGenerics] = useState<BleepsGenerics>({});

  const bleepsSetup: BleepsSetup = useMemo(() => {
    const parentSetupSettings = parentSetup?.settings;
    const parentAudioCategories = parentSetupSettings?.audio.categories;
    const localAudioCategories = props.settings?.audio?.categories;
    const audioCategories = { ...parentAudioCategories };

    if (localAudioCategories) {
      Object.keys(localAudioCategories).forEach(key => {
        const categoryName = key as BleepCategoryName;

        if (
          process.env.NODE_ENV !== 'production' &&
          !BLEEPS_CATEGORIES.includes(categoryName)
        ) {
          throw new Error(`Bleep category "${categoryName}" is not valid.`);
        }

        audioCategories[categoryName] = {
          ...audioCategories[categoryName],
          ...localAudioCategories?.[categoryName]
        };
      });
    }

    const audioSettings: BleepsAudioSettings = {
      common: {
        ...parentSetupSettings?.audio.common,
        ...props.settings.audio?.common
      },
      categories: audioCategories
    };

    const parentPlayersSettings = parentSetupSettings?.players;
    const playersSettings: BleepsPlayersSettings = { ...parentPlayersSettings };

    if (props.settings.players) {
      Object.keys(props.settings.players).forEach(playerName => {
        playersSettings[playerName] = {
          ...playersSettings[playerName],
          ...props.settings.players?.[playerName]
        };
      });
    }

    const parentBleepsSettings = parentSetupSettings?.bleeps;
    const bleepsSettings: BleepsSettings = {
      ...parentBleepsSettings,
      ...props.settings.bleeps
    };

    createOrUpdateBleeps(bleepsGenerics, audioSettings, playersSettings, bleepsSettings);

    return {
      settings: {
        audio: audioSettings,
        players: playersSettings,
        bleeps: bleepsSettings
      },
      bleeps: bleepsGenerics
    };
  }, [props.settings, parentSetup]);

  // TODO: Review performance recommendations for the memo dependencies.

  return (
    <BleepsContext.Provider value={bleepsSetup}>
      {props.children}
    </BleepsContext.Provider>
  );
};

export type { BleepsProviderProps };
export { BleepsProvider };
