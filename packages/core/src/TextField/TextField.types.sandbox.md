```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_TYPE_URL = '/assets/sounds/type.mp3';

const audioSettings = { common: { volume: 0.25 } };
const playersSettings = { type: { src: [SOUND_TYPE_URL], loop: true } };
const bleepsSettings = { type: { player: 'type' } };
const animatorGeneral = { duration: { enter: 200, exit: 200, stagger: 75 } };

const textFieldTypes = ['text', 'email', 'search', 'password', 'tel', 'url', 'number'];

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 4000);
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
              {textFieldTypes.map((type, index) =>
                <TextField
                  key={index}
                  type={type}
                  placeholder={`Text field ${type}`}
                  defaultValue=''
                  palette='primary'
                  style={{ marginBottom: 20 }}
                />
              )}
            </form>
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
