import React, { FC, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  BLEEPS_CATEGORIES,
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSettings,
  BleepCategoryName,
  BleepsGenerics,
  BleepsSetup
} from '../constants';
import { BleepsContext } from '../BleepsContext';
import { createOrUpdateBleeps } from '../utils/createOrUpdateBleeps';

interface BleepsProviderProps {
  audioSettings?: BleepsAudioSettings
  playersSettings?: BleepsPlayersSettings
  bleepsSettings?: BleepsSettings
}

const BleepsProvider: FC<BleepsProviderProps> = props => {
  const parentSetup = useContext(BleepsContext);

  // The bleeps object reference is always kept to properly unload/remove/update
  // current playing bleeps before settings updates.
  // Also, bleeps can not be extended in multiple providers to independently
  // manage them by each provider in the tree.
  const [bleepsGenerics] = useState<BleepsGenerics>({});

  const bleepsSetup: BleepsSetup = useMemo(() => {
    const parentAudioCategories = parentSetup?.audioSettings.categories;
    const localAudioCategories = props.audioSettings?.categories;
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
        ...parentSetup?.audioSettings.common,
        ...props.audioSettings?.common
      },
      categories: audioCategories
    };

    const parentPlayersSettings = parentSetup?.playersSettings;
    const playersSettings: BleepsPlayersSettings = { ...parentPlayersSettings };

    if (props.playersSettings) {
      Object.keys(props.playersSettings).forEach(playerName => {
        playersSettings[playerName] = {
          ...playersSettings[playerName],
          ...props.playersSettings?.[playerName]
        };
      });
    }

    const parentBleepsSettings = parentSetup?.bleepsSettings;
    const bleepsSettings: BleepsSettings = {
      ...parentBleepsSettings,
      ...props.bleepsSettings
    };

    createOrUpdateBleeps(bleepsGenerics, audioSettings, playersSettings, bleepsSettings);

    return { audioSettings, playersSettings, bleepsSettings, bleepsGenerics };
  }, [props.audioSettings, props.playersSettings, parentSetup]);

  return (
    <BleepsContext.Provider value={bleepsSetup}>
      {props.children}
    </BleepsContext.Provider>
  );
};

const bleepsAudioGroupSettingsProps = PropTypes.shape({
  volume: PropTypes.number,
  rate: PropTypes.number,
  preload: PropTypes.bool,
  disabled: PropTypes.bool
});

BleepsProvider.propTypes = {
  // @ts-expect-error
  audioSettings: PropTypes.shape({
    common: bleepsAudioGroupSettingsProps,
    categories: PropTypes.shape({
      background: bleepsAudioGroupSettingsProps,
      transition: bleepsAudioGroupSettingsProps,
      interaction: bleepsAudioGroupSettingsProps,
      notification: bleepsAudioGroupSettingsProps
    })
  }),
  // @ts-expect-error
  playersSettings: PropTypes.object,
  // @ts-expect-error
  bleepsSettings: PropTypes.object
};

export { BleepsProviderProps, BleepsProvider };
