import sinon from 'sinon';
import createPlayer from './index';

describe('createPlayer', function() {
  it('Should create a player with default config', function() {
    class Howl {}
    const player = createPlayer({ Howl });
    expect(player instanceof Howl).toBeTruthy();
  });

  it('Should create a player with config', function() {
    class Howl {
      constructor(config) {
        this.config = config;
      }
    }
    const sound = 10;
    const player = createPlayer({ Howl }, { sound });
    expect(player.config).toBe(sound);
  });

  it('Should create a player to play the sound only once a time', function() {
    const play = sinon.stub().returns(100);
    const stop = sinon.spy();
    class Howl {
      constructor() {
        this.play = play;
        this.stop = stop;
      }
    }
    const player = createPlayer({ Howl }, { settings: { oneAtATime: true } });

    const lastPlayId = player.play();
    player.play();

    expect(stop.callCount).toBe(1);
    expect(stop.calledWith(lastPlayId)).toBeTruthy();
  });
});
