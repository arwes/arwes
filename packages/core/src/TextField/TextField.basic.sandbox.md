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
        body: { fontFamily: FONT_FAMILY_ROOT },
        '.arwes-text-field': { marginBottom: 20 }
      }} />
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <Animator animator={{ activate, manager: 'stagger' }}>
            <form>
              <TextField
                placeholder='Text field placeholder'
                defaultValue=''
              />

              <TextField
                multiline
                placeholder='Text field placeholder'
                defaultValue=''
              />

              <TextField
                placeholder={[
                  'A nebula is an interstellar cloud of dust, hydrogen, helium and',
                  'other ionized gases. Originally, the term was used to describe',
                  'any diffused astronomical object, including galaxies beyond the',
                  'Milky Way.',
                ].join(' ')}
                defaultValue={[
                  'A nebula is an interstellar cloud of dust, hydrogen, helium and',
                  'other ionized gases. Originally, the term was used to describe',
                  'any diffused astronomical object, including galaxies beyond the',
                  'Milky Way.',
                ].join(' ')}
              />

              <TextField
                multiline
                placeholder={[
                  'A nebula is an interstellar cloud of dust, hydrogen, helium and',
                  'other ionized gases. Originally, the term was used to describe',
                  'any diffused astronomical object, including galaxies beyond the',
                  'Milky Way.',
                ].join(' ')}
                defaultValue={[
                  'A nebula is an interstellar cloud of dust, hydrogen, helium and',
                  'other ionized gases. Originally, the term was used to describe',
                  'any diffused astronomical object, including galaxies beyond the',
                  'Milky Way.',
                ].join(' ')}
              />

              <TextField
                placeholder='ReadOnly text field placeholder'
                defaultValue='ReadOnly text field value'
                readOnly
              />

              <TextField
                placeholder='Disabled text field placeholder'
                defaultValue='Disabled text field value'
                disabled
              />

              <TextField
                placeholder='AutoFocus text field placeholder'
                defaultValue='AutoFocus text field value'
                autoFocus
              />

              <TextField
                placeholder='Palette text field placeholder'
                defaultValue='Palette text field value'
                palette='secondary'
              />
            </form>
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
