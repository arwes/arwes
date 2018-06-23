import React from 'react';
import createSounds from '../tools/createSounds';
import withSounds from '../tools/withSounds';
import SoundsProvider from './index';

const Player = withSounds()(props => (
  <button style={{ margin: 10 }} onClick={() => props.sounds[props.id].play()}>
    Play {props.id}
  </button>
));

const sounds = {
  shared: { volume: 1 },
  players: {
    information: { sound: { src: ['/sound/information.mp3'] } },
    ask: { sound: { src: ['/sound/ask.mp3'] } },
    warning: { sound: { src: ['/sound/warning.mp3'] } },
    error: { sound: { src: ['/sound/error.mp3'] } }
  }
};

export default () => (
  <SoundsProvider sounds={createSounds(sounds)}>
    <div>
      <Player id="information" />
      <Player id="ask" />
      <Player id="warning" />
      <Player id="error" />
    </div>
  </SoundsProvider>
);
