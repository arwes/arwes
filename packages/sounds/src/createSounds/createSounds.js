import extend from 'extend';

export const SOUNDS_DEFAULT = {
  shared: {
    preload: true,
    volume: 0.5
  },
  players: {}
};

export default function createSounds(overwrite) {
  return extend(true, {}, SOUNDS_DEFAULT, overwrite);
}
