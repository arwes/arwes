```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_TYPE_URL = '/assets/sounds/type.mp3';
const SOUND_TOGGLE_URL = '/assets/sounds/toggle.mp3';

const audioSettings = { common: { volume: 0.25 } };
const playersSettings = {
  type: { src: [SOUND_TYPE_URL], loop: true },
  toggle: { src: [SOUND_TOGGLE_URL] }
};
const bleepsSettings = {
  type: { player: 'type' },
  toggle: { player: 'toggle' }
};
const animatorGeneral = { duration: { enter: 200, exit: 200, stagger: 75 } };
const fieldStyle = { marginBottom: 20 };

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 3000);
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

              <Checkbox
                defaultChecked={true}
                style={fieldStyle}
              >
                <Text>Input checkbox element.</Text>
              </Checkbox>

              <Checkbox
                defaultChecked={false}
                style={fieldStyle}
              >
                <Text>A nebula is an interstellar cloud of dust, hydrogen,
                helium and other ionized gases. Originally, the term was
                used to describe any diffused astronomical object, including
                galaxies beyond the Milky Way.</Text>
              </Checkbox>

              <Checkbox
                defaultChecked={true}
                readOnly
                style={fieldStyle}
              >
                <Text>ReadOnly input checkbox element.</Text>
              </Checkbox>

              <Checkbox
                defaultChecked={true}
                disabled
                style={fieldStyle}
              >
                <Text>Disabled input checkbox element.</Text>
              </Checkbox>

              <Checkbox
                defaultChecked={false}
                palette='secondary'
                style={fieldStyle}
              >
                <Text>Palette input checkbox element.</Text>
              </Checkbox>

              <Checkbox
                autoFocus
                defaultChecked={false}
                style={fieldStyle}
              >
                <Text>
                  Autofocus input checkbox element.
                  <b>Press SPACE key on load.</b>
                </Text>
              </Checkbox>

            </form>
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
