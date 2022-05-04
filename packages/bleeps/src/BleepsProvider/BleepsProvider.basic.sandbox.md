```tsx
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import {
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSettings,
  BleepsProvider,
  useBleeps
} from '@arwes/bleeps';

const SOUND_CLICK_URL = '/assets/sounds/click.mp3';

const Button = ({ children }): ReactElement => {
  const bleeps = useBleeps();
  const onClick = () => bleeps.tap.play();
  return <button onClick={onClick}>{children}</button>;
};

const Sandbox = (): ReactElement => {
  const audioSettings: BleepsAudioSettings = {
    common: {
      volume: 0.5
    }
  };
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

  return (
    <BleepsProvider
      settings={{
        audio: audioSettings,
        players: playersSettings,
        bleeps: bleepsSettings
      }}
    >
      <Button>Bleep!</Button>
    </BleepsProvider>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
