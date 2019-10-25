import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { SoundsContext } from '../SoundsContext';

function SoundsProvider ({ players, audio, children }) {
  const parentContext = useContext(SoundsContext) || {};
  const providedValue = {
    players: {
      ...parentContext.players,
      ...players
    },
    audio: {
      ...parentContext.audio,
      ...audio
    }
  };

  return (
    <SoundsContext.Provider value={providedValue}>
      {children}
    </SoundsContext.Provider>
  );
}

SoundsProvider.propTypes = {
  players: PropTypes.object.isRequired,
  audio: PropTypes.object.isRequired,
  children: PropTypes.any
};

SoundsProvider.defaultProps = {
  players: {},
  audio: {}
};

export { SoundsProvider };
