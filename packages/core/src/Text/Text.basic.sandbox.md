```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';

const audio = { common: { volume: 0.1 } };
const players = { typing: { src: [SOUND_TYPING_URL], loop: true } };
const duration = { enter: 1000, exit: 1000 };

function Sandbox () {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT }
      }} />
      <BleepsProvider audio={audio} players={players}>
        <Text animator={{ duration, activate }}>
          Lorem ipsum dolor sit amet, <b>consectetur adipiscing</b> elit,
          sed do eiusmod tempor <i>incididunt <b>ut labore et dolore
          magna</b> aliqua</i>. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco <a href='#'>laboris nisi ut aliquip</a> ex
          ea commodo consequat.
        </Text>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
}

render(<Sandbox />);
```
