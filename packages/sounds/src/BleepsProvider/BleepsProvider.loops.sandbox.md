```jsx
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';

const ButtonTyping = ({ children }) => {
  const bleeps = useBleeps();
  const [status, setStatus] = React.useState('Not typing');

  const onClick = () => {
    if (bleeps.typing.getIsPlaying()) {
      bleeps.typing.stop();
      setStatus('Not typing.');
    } else {
      bleeps.typing.play();
      setStatus('Typing...');
    }
  };

  // If the component is unmounted and there are
  // bleeps playing, they should be stopped.
  React.useEffect(() => {
    return () => bleeps.typing.stop();
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
    typing: {
      src: [SOUND_TYPING_URL],
      loop: true
    }
  };
  const bleepsSettings = {
    typing: {
      player: 'typing'
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
