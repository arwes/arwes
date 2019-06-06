import React from 'react';
import PropTypes from 'prop-types';
import { SoundsContext } from '../SoundsContext';

function SoundsProvider ({ players, audio, children }) {
  return (
    <SoundsContext.Provider value={{ players, audio }}>
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
