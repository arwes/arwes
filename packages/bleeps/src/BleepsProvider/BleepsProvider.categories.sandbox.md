```jsx
const SOUND_CLICK_URL = '/assets/sounds/click.mp3';
const SOUND_WARNING_URL = '/assets/sounds/warning.mp3';

const InteractClick = ({ children }) => {
  const bleeps  = useBleeps();
  const onClick = () => bleeps.tap.play();
  return <button onClick={onClick}>{children}</button>;
};

const NotifyWarn = ({ children }) => {
  const bleeps  = useBleeps();
  const onClick = () => bleeps.warn.play();
  return <button onClick={onClick}>{children}</button>;
};

function Sandbox () {
  const audioSettings = {
    // Default audio settings.
    common: {
      volume: 0.1
    },
    categories: {
      // Interaction bleeps settings.
      interaction: {
        volume: 1
      },
      // Notification bleeps settings.
      notification: {
        volume: 0.5
      }
    }
  };
  const playersSettings = {
    click: {
      src: [SOUND_CLICK_URL]
    },
    warning: {
      src: [SOUND_WARNING_URL]
    }
  };
  const bleepsSettings = {
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
      audioSettings={audioSettings}
      playersSettings={playersSettings}
      bleepsSettings={bleepsSettings}
    >
      <InteractClick>Interaction Click!</InteractClick>
      {' '}
      <NotifyWarn>Notification Warning!</NotifyWarn>
    </BleepsProvider>
  );
}

render(<Sandbox />);
```
