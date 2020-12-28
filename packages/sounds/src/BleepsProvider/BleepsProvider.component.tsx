import React, { FC, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSetup
} from '../constants';
import { BleepsContext } from '../BleepsContext';

interface BleepsProviderProps {
  audio?: BleepsAudioSettings
  players?: BleepsPlayersSettings
  children?: any
}

const BleepsProvider: FC<BleepsProviderProps> = props => {
  const parentSetup = useContext(BleepsContext);

  const bleepsSetup: BleepsSetup = useMemo(() => {
    const parentAudioCategories = parentSetup?.audioSettings.categories;
    const localAudioCategories = props.audio?.categories;
    const audioCategories = { ...parentAudioCategories };

    if (localAudioCategories) {
      Object.keys(localAudioCategories).forEach(categoryName => {
        audioCategories[categoryName] = {
          ...audioCategories[categoryName],
          ...localAudioCategories[categoryName]
        };
      });
    }

    const audioSettings: BleepsAudioSettings = {
      common: {
        ...parentSetup?.audioSettings.common,
        ...props.audio?.common
      },
      categories: audioCategories
    };

    const parentPlayers = parentSetup?.playersSettings;
    const players = { ...parentPlayers };

    if (props.players) {
      Object.keys(props.players).forEach(playerName => {
        players[playerName] = {
          ...players[playerName],
          ...props.players?.[playerName]
        };
      });
    }

    const playersSettings: BleepsPlayersSettings = players;

    return { audioSettings, playersSettings };
  }, [props.audio, props.players, parentSetup]);

  return (
    <BleepsContext.Provider value={bleepsSetup}>
      {props.children}
    </BleepsContext.Provider>
  );
};

BleepsProvider.propTypes = {
  // @ts-expect-error
  audio: PropTypes.shape({
    common: PropTypes.shape({
      volume: PropTypes.number,
      mute: PropTypes.bool,
      rate: PropTypes.number,
      preload: PropTypes.bool
    }),
    categories: PropTypes.object
  }),
  // @ts-expect-error
  players: PropTypes.object,
  children: PropTypes.any
};

export { BleepsProviderProps, BleepsProvider };
