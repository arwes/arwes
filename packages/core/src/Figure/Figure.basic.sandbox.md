```jsx
const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const IMAGE_URL = '/assets/images/wallpaper.jpg';
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';
const SOUND_READOUT_URL = '/assets/sounds/readout.mp3';
const SOUND_OBJECT_URL = '/assets/sounds/object.mp3';

const audio = {
  common: { volume: 0.4 }
};
const players = {
  typing: { src: [SOUND_TYPING_URL], loop: true },
  readout: { src: [SOUND_READOUT_URL], loop: true },
  object: { src: [SOUND_OBJECT_URL] }
};

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{ body: { fontFamily: ROOT_FONT_FAMILY } }} />
      <BleepsProvider audio={audio} players={players}>
        <AnimatorGeneralProvider animator={{ duration: { enter: 200, exit: 200 } }}>
          <Animator animator={{ activate, manager: 'stagger' }}>
            <Text as='h1'>
              Nebula
            </Text>
            <Figure
              src={IMAGE_URL}
              alt='A nebula'
            >
              A nebula is an interstellar cloud of dust, hydrogen, helium and
              other ionized gases. Originally, the term was used to describe
              any diffused astronomical object, including galaxies beyond
              the Milky Way.
            </Figure>
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
