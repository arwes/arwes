```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_TYPE_URL = '/assets/sounds/type.mp3';

const audioSettings = { common: { volume: 0.25 } };
const playersSettings = { type: { src: [SOUND_TYPE_URL], loop: true } };
const bleepsSettings = { type: { player: 'type' } };
const animatorGeneral = { duration: { enter: 150, exit: 150, stagger: 40 } };

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

            <List>
              <li><Text>Lorem ipsum lov sit amet.</Text></li>
              <li><Text>Lorem ipsum lov sit amet.</Text></li>
              <li>
                <Text>Lorem ipsum lov sit amet.</Text>
                <List>
                  <li><Text>Lorem ipsum lov sit amet.</Text></li>
                  <li><Text>Lorem ipsum lov sit amet.</Text></li>
                  <li><Text>Lorem ipsum lov sit amet.</Text></li>
                </List>
              </li>
              <li><Text>Lorem ipsum lov sit amet.</Text></li>
            </List>

            <List as='ol'>
              <li><Text>Lorem ipsum lov sit amet.</Text></li>
              <li><Text>Lorem ipsum lov sit amet.</Text></li>
              <li>
                <Text>Lorem ipsum lov sit amet.</Text>
                <List as='ol'>
                  <li><Text>Lorem ipsum lov sit amet.</Text></li>
                  <li><Text>Lorem ipsum lov sit amet.</Text></li>
                  <li><Text>Lorem ipsum lov sit amet.</Text></li>
                </List>
              </li>
              <li><Text>Lorem ipsum lov sit amet.</Text></li>
            </List>

          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
