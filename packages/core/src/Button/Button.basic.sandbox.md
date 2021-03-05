```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_ASSEMBLE_URL = '/assets/sounds/assemble.mp3';
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';
const SOUND_CLICK_URL = '/assets/sounds/click.mp3';

const audio = { common: { volume: 0.4 } };
const players = {
  assemble: { src: [SOUND_ASSEMBLE_URL], loop: true },
  typing: { src: [SOUND_TYPING_URL], loop: true },
  click: { src: [SOUND_CLICK_URL] }
};
const animatorGeneral = { duration: { enter: 200, exit: 200 } };

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <BleepsProvider audio={audio} players={players}>
        <StylesBaseline styles={{
          body: { fontFamily: FONT_FAMILY_ROOT }
        }} />
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <Button
            animator={{ activate }}
            palette='secondary'
            onClick={event => console.log(event)}
          >
            <Text>Download Data</Text>
          </Button>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
