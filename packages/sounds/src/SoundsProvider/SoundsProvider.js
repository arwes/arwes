import React from 'react';
import PropTypes from 'prop-types';

import createPlayerModule from '../createPlayer';

export default class SoundsProvider extends React.Component {
  static propTypes = {
    sounds: PropTypes.object.isRequired,
    createPlayer: PropTypes.func.isRequired,
    children: PropTypes.any
  };

  static defaultProps = {
    createPlayer: createPlayerModule
  };

  static childContextTypes = {
    sounds: PropTypes.object
  };

  getChildContext () {
    const { sounds, createPlayer } = this.props;
    const { shared, players } = sounds;

    const soundsPlayers = {};

    Object.keys(players).forEach(name => {
      const player = players[name];

      // Spread the shared config for all sounds.
      player.sound = {
        ...shared,
        ...player.sound
      };

      soundsPlayers[name] = createPlayer(player);
    });

    return { sounds: soundsPlayers };
  }

  render () {
    return React.Children.only(this.props.children);
  }
}
