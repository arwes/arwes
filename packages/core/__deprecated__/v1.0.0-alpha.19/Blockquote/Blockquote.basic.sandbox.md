```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_TYPE_URL = '/assets/sounds/type.mp3';

const audioSettings = { common: { volume: 0.25 } };
const playersSettings = { type: { src: [SOUND_TYPE_URL], loop: true } };
const bleepsSettings = { type: { player: 'type' } };
const animatorGeneral = { duration: { enter: 200, exit: 200 } };

const Example = ({ palette }) => (
  <Blockquote palette={palette}>
    <Text>
      Lorem ipsum dolor sit amet, <b>consectetur adipiscing</b> elit,
      sed do eiusmod tempor <i>incididunt <b>ut labore et dolore
      magna</b> aliqua</i>. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco <a href='#'>laboris nisi ut aliquip</a> ex
      ea commodo consequat.
    </Text>
  </Blockquote>
);

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <StylesBaseline styles={{
          body: { fontFamily: FONT_FAMILY_ROOT }
        }} />
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <Animator animator={{ activate }}>
            <Example />
            <Example palette='secondary' />
            <Example palette='success' />
            <Example palette='error' />
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
