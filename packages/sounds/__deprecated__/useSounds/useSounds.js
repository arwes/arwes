import { useContext } from 'react';
import { SoundsContext } from '../SoundsContext';

function useSounds () {
  const context = useContext(SoundsContext);
  return {
    players: {},
    audio: {},
    ...context
  };
}

export { useSounds };
