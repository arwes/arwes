```js
const SOUND_CLICK_URL = '/assets/sounds/click.mp3';

const ButtonComponent = ({ bleeps, children }) => {
  const onClick = () => bleeps.tap.play();
  return <button onClick={onClick}>{children}</button>;
};

const bleepsSettings = {
  tap: {
    player: 'click'
  }
};

const Button = withBleeps(bleepsSettings)(ButtonComponent);

function Sandbox () {
  const audio = {
    common: {
      volume: 0.5
    }
  };
  const players = {
    click: {
      src: [SOUND_CLICK_URL]
    }
  };

  return (
    <BleepsProvider audio={audio} players={players}>
      <Button>Bleep!</Button>
    </BleepsProvider>
  );
}

render(<Sandbox />);
```
