import React from 'react';
import createSounds from '../createSounds';
import withSounds from '../withSounds';
import SoundsProvider from './index';

const Player = withSounds()(props => (
  <button style={{ margin: 10 }} onClick={() => props.sounds[props.id].play()}>
    Play {props.id}
  </button>
));

const sounds = {
  shared: { volume: 1 },
  players: {
    information: { sound: { src: ['/sounds/information.mp3'] } },
    ask: { sound: { src: ['/sounds/ask.mp3'] } },
    warning: { sound: { src: ['/sounds/warning.mp3'] } },
    error: { sound: { src: ['/sounds/error.mp3'] } }
  }
};

export default () => (
  <SoundsProvider sounds={createSounds(sounds)}>
    <div>
      <Player id='information' />
      <Player id='ask' />
      <Player id='warning' />
      <Player id='error' />
    </div>
  </SoundsProvider>
);
