import React, { ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSettings,
  BleepsProvider,
  useBleeps
} from '@arwes/bleeps';

const SOUND_TYPE_URL = '/assets/sounds/type.mp3';

const ButtonTyping = (): ReactElement => {
  const bleeps = useBleeps();
  const [status, setStatus] = useState('Not typing');

  const onClick = (): void => {
    if (bleeps.type.getIsPlaying()) {
      bleeps.type.stop();
      setStatus('Not typing');
    }
    else {
      bleeps.type.play();
      setStatus('Typing...');
    }
  };

  // If the component is unmounted and there are
  // bleeps playing, they should be stopped.
  useEffect(() => {
    return () => bleeps.type.stop();
  }, []);

  return <button onClick={onClick}>Bleep: {status}</button>;
};

const Sandbox = (): ReactElement => {
  const audioSettings: BleepsAudioSettings = {
    common: {
      volume: 0.4
    }
  };
  const playersSettings: BleepsPlayersSettings = {
    type: {
      src: [SOUND_TYPE_URL],
      loop: true
    }
  };
  const bleepsSettings: BleepsSettings = {
    type: {
      player: 'type'
    }
  };

  return (
    <BleepsProvider
      settings={{
        audio: audioSettings,
        players: playersSettings,
        bleeps: bleepsSettings
      }}
    >
      <ButtonTyping />
    </BleepsProvider>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Sandbox />);
