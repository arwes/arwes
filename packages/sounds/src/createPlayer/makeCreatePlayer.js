export default function makeCreatePlayer ({ Howl }) {
  return function createPlayer (conf) {
    const { sound = {}, settings = {} } = conf || {};
    const player = new Howl(sound);

    // Patch the player .play() to make it play only one at a time if it is
    // called many times simultaneously.
    if (settings.oneAtATime) {
      const play = player.play.bind(player);
      let lastPlay;
      player.play = function (...args) {
        if (lastPlay) {
          this.stop(lastPlay);
        }
        lastPlay = play(...args);
        return lastPlay;
      };
    }

    return player;
  };
}
