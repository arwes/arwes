import makeCreatePlayer from './makeCreatePlayer';

describe('makeCreatePlayer()', () => {
  it('Should return a function', () => {
    const createPlayer = makeCreatePlayer({});
    expect(typeof createPlayer).toBe('function');
  });

  it('Should create a player with default config', () => {
    class Howl {}
    const createPlayer = makeCreatePlayer({ Howl });
    const player = createPlayer();
    expect(player instanceof Howl).toBeTruthy();
  });

  it('Should create a player sound with config', () => {
    class Howl {
      constructor(config) {
        this.config = config;
      }
    }
    const sound = 10;

    const createPlayer = makeCreatePlayer({ Howl });
    const player = createPlayer({ sound });

    expect(player.config).toBe(sound);
  });

  it('Should create a player to play the sound only once a time', () => {
    const play = jest.fn().mockReturnValue(100);
    const stop = jest.fn();
    class Howl {
      constructor() {
        this.play = play;
        this.stop = stop;
      }
    }

    const createPlayer = makeCreatePlayer({ Howl });
    const player = createPlayer({ settings: { oneAtATime: true } });

    player.play();
    player.play();

    expect(stop).toHaveBeenCalledTimes(1);
    expect(stop).toHaveBeenCalledWith(100);
  });
});
