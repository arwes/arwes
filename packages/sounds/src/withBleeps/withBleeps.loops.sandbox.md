```js
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';

const TypingComponent = ({ bleeps, children }) => {
  const [status, setStatus] = React.useState('Not typing.');

  const onClick = () => {
    if (bleeps.typing.getIsPlaying()) {
      bleeps.typing.stop();
      setStatus('Not typing.');
    } else {
      bleeps.typing.play();
      setStatus('Typing...');
    }
  };

  return <button onClick={onClick}>{status}</button>;
};

const typingBleepsSettings = {
  typing: {
    player: 'typing'
  }
};

const Typing = withBleeps(typingBleepsSettings)(TypingComponent);

function Sandbox () {
  const audio = {
    common: {
      volume: 0.5
    }
  };
  const players = {
    typing: {
      src: [SOUND_TYPING_URL],
      loop: true
    }
  };

  return (
    <BleepsProvider audio={audio} players={players}>
      <Typing />
    </BleepsProvider>
  );
}

render(<Sandbox />);
```
