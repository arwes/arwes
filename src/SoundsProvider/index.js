import { Component } from 'react';
import PropTypes from 'prop-types';
import createPlayerModule from '../tools/createPlayer';

export default class SoundsProvider extends Component {

  static propTypes = {
    sounds: PropTypes.object.isRequired,
    createPlayer: PropTypes.any.isRequired
  }

  static defaultProps = {
    createPlayer: createPlayerModule
  }

  static childContextTypes = {
    sounds: PropTypes.object
  }

  getChildContext () {

    const { sounds, createPlayer } = this.props;
    const { shared, players } = sounds;

    const soundsPlayers = {};

    Object.keys(players).forEach(name => {
      const player = players[name];

      // Spread the shared config for all sounds.
      player.sound = {
        ...shared,
        ...player.sound,
      };

      soundsPlayers[name] = createPlayer(null, player);
    });

    return { sounds: soundsPlayers };
  }

  render () {
    return this.props.children;
  }
}
