```js
const SOUND_INFORMATION_URL = '/assets/sounds/information.mp3';
const SOUND_WARNING_URL = '/assets/sounds/warning.mp3';

// NotifyInfo

const NotifyInfoComponent = ({ bleeps, children }) => {
  const onClick = () => bleeps.info.play();
  return <button onClick={onClick}>{children}</button>;
};

const buttonBleepsSettings = {
  info: {
    player: 'information'
  }
};

const NotifyInfo = withBleeps(buttonBleepsSettings)(NotifyInfoComponent);

// NotifyWarn

const NotifyWarnComponent = ({ bleeps, children }) => {
  const onClick = () => bleeps.notify.play();
  return <button onClick={onClick}>{children}</button>;
};

const notifyBleepsSettings = {
  notify: {
    player: 'warning',
    category: 'notification'
  }
};

const NotifyWarn = withBleeps(notifyBleepsSettings)(NotifyWarnComponent);

// Sandbox

function Sandbox () {
  const audio = {
    common: {
      volume: 0.1
    },
    categories: {
      notification: {
        volume: 1
      }
    }
  };
  const players = {
    information: {
      src: [SOUND_INFORMATION_URL]
    },
    warning: {
      src: [SOUND_WARNING_URL]
    }
  };

  return (
    <BleepsProvider audio={audio} players={players}>
      {/*
        The information bleep will have common audio
        settings with low volume.
      */}
      <NotifyInfo>Information</NotifyInfo>
      {' '}
      {/*
        The warning bleep will have common audio and extended
        by the notification category settings with high volume.
      */}
      <NotifyWarn>Warning</NotifyWarn>
    </BleepsProvider>
  );
}

render(<Sandbox />);
```
