```js
const SOUND_CLICK_URL = '/sounds/click.mp3';
const SOUND_WARNING_URL = '/sounds/warning.mp3';

// Button

const ButtonComponent = ({ bleeps, children }) => {
  const onClick = () => bleeps.tap.play();
  return <button onClick={onClick}>{children}</button>;
};

const buttonBleepsSettings = {
  tap: {
    player: 'click',
    category: 'interaction'
  }
};

const Button = withBleeps(buttonBleepsSettings)(ButtonComponent);

// Notify

const NotifyComponent = ({ bleeps, children }) => {
  const onClick = () => bleeps.notify.play();
  return <button onClick={onClick}>{children}</button>;
};

const notifyBleepsSettings = {
  notify: {
    player: 'warning',
    category: 'notification'
  }
};

const Notify = withBleeps(notifyBleepsSettings)(NotifyComponent);

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
    click: {
      src: [SOUND_CLICK_URL]
    },
    warning: {
      src: [SOUND_WARNING_URL]
    }
  };

  return (
    <BleepsProvider audio={audio} players={players}>
      <Button>Button</Button>
      {' '}
      <Notify>Warning</Notify>
    </BleepsProvider>
  );
}

render(<Sandbox />);
```
