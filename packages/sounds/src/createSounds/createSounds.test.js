import createSounds, { SOUNDS_DEFAULT } from './createSounds';

describe('createSounds()', () => {
  it('Should return default values when no settings were provided', () => {
    const actual = createSounds();
    const expected = SOUNDS_DEFAULT;
    expect(actual).toEqual(expected);
  });

  it('Should return extended settings when provided', () => {
    const actual = createSounds({
      galaxy: 50,
      shared: {
        game: 100
      }
    });
    const expected = {
      ...SOUNDS_DEFAULT,
      galaxy: 50,
      shared: {
        ...SOUNDS_DEFAULT.shared,
        game: 100
      }
    };
    expect(actual).toEqual(expected);
  });
});
