export const SOUNDS_DEFAULT = {
  shared: {
    preload: true,
    volume: 0.5
  },
  players: {}
};

export default function createSounds (overwrite = {}) {
  return {
    ...SOUNDS_DEFAULT,
    ...overwrite,
    shared: {
      ...SOUNDS_DEFAULT.shared,
      ...overwrite.shared
    }
  };
}
