import sinon from 'sinon';
import createPlayer from './index';

describe('createPlayer', function () {

  it('Should create a player with default config', function () {
    class Howl {}
    const player = createPlayer({ Howl });
    expect(player).to.be.an.instanceof(Howl);
  });

  it('Should create a player with config', function () {
    class Howl {
      constructor (config) {
        this.howl = config;
      }
    }
    const howl = 10;
    const player = createPlayer({ Howl }, { howl });
    expect(player.howl).to.equal(howl);
  });

  it('Should create a player to play the sound only once a time', function () {
    const play = sinon.stub().returns(1);
    const stop = sinon.spy();
    class Howl {
      constructor () {
        this.play = play;
        this.stop = stop;
      }
    }
    const player = createPlayer({ Howl }, { settings: { oneAtTheTime: true } });

    const lastPlayId = player.play();
    player.play();

    expect(stop.callCount).to.equal(1);
    expect(stop.calledWith(lastPlayId)).to.be.true;
  });

});
