import React, { ReactNode, ReactElement, StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSettings,
  BleepsProvider,
  useBleeps
} from '@arwes/bleeps';

const SOUND_CLICK_URL = '/assets/sounds/click.mp3';
const VOLUME_LOW = 0.1;
const VOLUME_HIGH = 1;

const Button = ({ children }: { children: ReactNode }): ReactElement => {
  const bleeps = useBleeps();
  const onClick = (): void => {
    // A bleep will not come if it is disabled in settings.
    bleeps.tap?.play();
  };
  return <button onClick={onClick}>{children}</button>;
};

// Since the players and bleeps settings are not updated,
// they are set outside of the function scope
// so they are constant.
const playersSettings: BleepsPlayersSettings = {
  click: {
    src: [SOUND_CLICK_URL]
  }
};
const bleepsSettings: BleepsSettings = {
  tap: {
    player: 'click'
  }
};

const Sandbox = (): ReactElement => {
  const [volume, setVolume] = useState(VOLUME_HIGH);
  const [disabled, setDisabled] = useState(false);
  const [audioSettings, setAudioSettings] = useState<BleepsAudioSettings>(() => ({
    common: { volume, disabled }
  }));

  const onDisableChange = (): void => {
    setDisabled(!disabled);
  };
  const getIsVolumeHigh = (): boolean => {
    return audioSettings.common?.volume === VOLUME_HIGH;
  };
  const onVolumeChange = (): void => {
    setVolume(getIsVolumeHigh() ? VOLUME_LOW : VOLUME_HIGH);
  };

  useEffect(() => {
    setAudioSettings({
      common: { volume, disabled }
    });
  }, [volume, disabled]);

  return (
    <BleepsProvider
      settings={{
        audio: audioSettings,
        players: playersSettings,
        bleeps: bleepsSettings
      }}
    >
      <div>
        <button onClick={onVolumeChange}>
          Volume {getIsVolumeHigh() ? 'Down' : 'Up'}
        </button>
        {' '}
        <button onClick={onDisableChange}>
          {disabled ? 'Enable' : 'Disable'}
        </button>
      </div>
      <br />
      <div>
        <Button>Bleep 1!</Button>
        {' '}
        <Button>Bleep 2!</Button>
        {' '}
        <Button>Bleep 3!</Button>
      </div>
    </BleepsProvider>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<StrictMode><Sandbox /></StrictMode>);
