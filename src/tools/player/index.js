import howler from 'howler';

export default (depencencies, conf) => {
  const deps = {
    Howl: howler.Howl,
    ...depencencies,
  };

  const { howl = {}, settings = {} } = conf || {};
  const player = new deps.Howl(howl);

  if (settings.oneAtTheTime) {
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
