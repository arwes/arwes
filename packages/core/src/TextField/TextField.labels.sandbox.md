```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_TYPE_URL = '/assets/sounds/type.mp3';

const audioSettings = { common: { volume: 0.25 } };
const playersSettings = { type: { src: [SOUND_TYPE_URL], loop: true } };
const bleepsSettings = { type: { player: 'type' } };
const animatorGeneral = { duration: { enter: 200, exit: 200, stagger: 75 } };

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const time = activate ? 4000 : 1000;
    const timeout = setTimeout(() => setActivate(!activate), time);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT }
      }} />
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <Animator animator={{ activate, manager: 'stagger' }}>
            <form>
              <label style={{ display: 'block', marginBottom: 20 }}>
                <Text style={{ display: 'block', marginBottom: 10 }}>
                  Text Field Label
                </Text>
                <TextField
                  placeholder='Text field placeholder'
                  defaultValue=''
                />
              </label>

              <label style={{ display: 'block', marginBottom: 20 }}>
                <Text style={{ display: 'block', marginBottom: 10 }}>
                  Text Field Label
                </Text>
                <TextField
                  placeholder='Text field placeholder'
                  defaultValue='Text field value'
                />
              </label>
            </form>
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
