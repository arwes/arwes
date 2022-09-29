import React, { ReactNode, ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { BleepsAudioSettings, BleepsPlayersSettings, BleepsSettings } from '@arwes/bleeps';
import { BleepsProvider, useBleeps } from '@arwes/react-bleeps';

const SOUND_CLICK_URL = '/assets/sounds/click.mp3';
const SOUND_WARNING_URL = '/assets/sounds/warning.mp3';

const InteractClick = ({ children }: { children: ReactNode }): ReactElement => {
  const bleeps = useBleeps();
  const onClick = (): void => bleeps.tap.play();
  return <button onClick={onClick}>{children}</button>;
};

const NotifyWarn = ({ children }: { children: ReactNode }): ReactElement => {
  const bleeps = useBleeps();
  const onClick = (): void => bleeps.warn.play();
  return <button onClick={onClick}>{children}</button>;
};

const Sandbox = (): ReactElement => {
  const audioSettings: BleepsAudioSettings = {
    // Default audio settings.
    common: {
      volume: 0.5
    },
    categories: {
      // Interaction bleeps settings.
      interaction: {
        volume: 0.1
      },
      // Notification bleeps settings.
      notification: {
        volume: 1
      }
    }
  };
  const playersSettings: BleepsPlayersSettings = {
    click: {
      src: [SOUND_CLICK_URL]
    },
    warning: {
      src: [SOUND_WARNING_URL]
    }
  };
  const bleepsSettings: BleepsSettings = {
    tap: {
      player: 'click',
      category: 'interaction'
    },
    warn: {
      player: 'warning',
      category: 'notification'
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
      <InteractClick>Interaction Click!</InteractClick>
      {' '}
      <NotifyWarn>Notification Warning!</NotifyWarn>
    </BleepsProvider>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
