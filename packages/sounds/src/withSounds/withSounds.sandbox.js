import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import { SoundsProvider } from '../SoundsProvider';
import { withSounds } from './index';

const PlayerSource = ({ players, audio, name }) => (
  <button onClick={() => !audio.mute && players[name].play()}>
    Play {name}
  </button>
);

PlayerSource.propTypes = {
  players: PropTypes.object,
  audio: PropTypes.object,
  name: PropTypes.string
};

const Player = withSounds()(PlayerSource);

const players = {
  information: new Howl({ src: ['/sounds/information.mp3'] }),
  ask: new Howl({ src: ['/sounds/ask.mp3'] }),
  warning: new Howl({ src: ['/sounds/warning.mp3'] }),
  error: new Howl({ src: ['/sounds/error.mp3'] })
};

function Sandbox () {
  const [mute, setMute] = useState(false);

  return (
    <SoundsProvider players={players} audio={{ mute }}>
      <div style={{ margin: '20px' }}>
        <Player name='information' />
        <Player name='ask' />
        <Player name='warning' />
        <Player name='error' />
      </div>
      <div style={{ margin: '20px' }}>
        <button onClick={() => setMute(!mute)}>
          {mute ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </SoundsProvider>
  );
}

export default Sandbox;
