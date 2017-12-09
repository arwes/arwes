import howler from 'howler';

export default (depencencies, conf) => {
  const deps = {
    Howl: howler.Howl,
    ...depencencies,
  };

  const { sound = {}, settings = {} } = conf || {};
  const player = new deps.Howl(sound);

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
