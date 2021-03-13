```jsx
const SOUND_CLICK_URL = '/assets/sounds/click.mp3';

const Button = ({ children }) => {
  const bleeps = useBleeps();
  const onClick = () => bleeps.tap.play();
  return <button onClick={onClick}>{children}</button>;
};

function Sandbox () {
  const audioSettings = {
    common: {
      volume: 0.5
    }
  };
  const playersSettings = {
    click: {
      src: [SOUND_CLICK_URL]
    }
  };
  const bleepsSettings = {
    tap: {
      player: 'click'
    }
  };

  return (
    <BleepsProvider
      audioSettings={audioSettings}
      playersSettings={playersSettings}
      bleepsSettings={bleepsSettings}
    >
      <Button>Bleep!</Button>
    </BleepsProvider>
  );
}

render(<Sandbox />);
```
