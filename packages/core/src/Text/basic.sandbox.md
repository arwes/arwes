```js
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';

function Sandbox () {
  const [audio] = React.useState({
    common: { volume: 0.1 }
  });
  const [players] = React.useState({
    typing: { src: [SOUND_TYPING_URL], loop: true }
  });
  const [duration] = React.useState({ enter: 1000, exit: 1000 });
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <div style={{ color: 'cyan' }}>
      <BleepsProvider audio={audio} players={players}>
        <Text animator={{ duration, activate }}>
          Lorem ipsum dolor sit amet, <b>consectetur adipiscing</b> elit,
          sed do eiusmod tempor <i>incididunt <b>ut labore et dolore
          magna</b> aliqua</i>. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco <a href='#'>laboris nisi ut aliquip</a>
          ex ea commodo consequat.
        </Text>
      </BleepsProvider>
    </div>
  );
}

render(<Sandbox />);
```
