import React, { useContext } from 'react';
import { SoundsContext } from '../SoundsContext';

function withSounds (options = {}) {
  return function hoc (Component) {
    function Sounds (props, ref) {
      let {
        players = {},
        audio = {}
      } = useContext(SoundsContext) || {};

      players = {
        ...players,
        ...options.players,
        ...props.players // eslint-disable-line react/prop-types
      };

      audio = {
        ...audio,
        ...options.audio,
        ...props.audio // eslint-disable-line react/prop-types
      };

      return (
        <Component
          {...props}
          ref={ref}
          players={players}
          audio={audio}
        />
      );
    }

    const soundsDisplayName = Component.displayName || Component.name;
    Sounds.displayName = `withSounds(${soundsDisplayName})`;

    return React.forwardRef(Sounds);
  };
}

export { withSounds };
