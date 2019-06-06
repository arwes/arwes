import React, { useContext } from 'react';
import { SoundsContext } from '../SoundsContext';

function withSounds (options = {}) {
  return function hoc (Inner) {
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
        <Inner
          {...props}
          ref={ref}
          players={players}
          audio={audio}
        />
      );
    }

    const soundsDisplayName = Inner.displayName || Inner.name;
    Sounds.displayName = `withSounds(${soundsDisplayName})`;

    return React.forwardRef(Sounds);
  };
}

export { withSounds };
