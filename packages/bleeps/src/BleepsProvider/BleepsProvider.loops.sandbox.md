```jsx
const SOUND_TYPE_URL = '/assets/sounds/type.mp3';

const ButtonTyping = ({ children }) => {
  const bleeps = useBleeps();
  const [status, setStatus] = React.useState('Not typing');

  const onClick = () => {
    if (bleeps.type.getIsPlaying()) {
      bleeps.type.stop();
      setStatus('Not typing.');
    } else {
      bleeps.type.play();
      setStatus('Typing...');
    }
  };

  // If the component is unmounted and there are
  // bleeps playing, they should be stopped.
  React.useEffect(() => {
    return () => bleeps.type.stop();
  }, []);

  return <button onClick={onClick}>{status}</button>;
};

function Sandbox () {
  const audioSettings = {
    common: {
      volume: 0.4
    }
  };
  const playersSettings = {
    type: {
      src: [SOUND_TYPE_URL],
      loop: true
    }
  };
  const bleepsSettings = {
    type: {
      player: 'type'
    }
  };

  return (
    <BleepsProvider
      audioSettings={audioSettings}
      playersSettings={playersSettings}
      bleepsSettings={bleepsSettings}
    >
      <ButtonTyping />
    </BleepsProvider>
  );
}

render(<Sandbox />);
```
