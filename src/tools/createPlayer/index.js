import howler from 'howler';

/**
 * Create handler for sound player functionalities.
 * This uses the `howler` package to create a player.
 * @param  {Object} depencencies
 * @param  {Function} depencencies.Howl
 * @param  {Object} conf - Player configuration
 * @param  {Object} conf.sound - Configuration passed to `howler.Howl`.
 * @param  {Object} conf.settings - Sound settings
 * @return {Howl}
 */
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
