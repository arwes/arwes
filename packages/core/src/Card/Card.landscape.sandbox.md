```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const IMAGE_URL = '/assets/images/wallpaper.jpg';
const SOUND_OBJECT_URL = '/assets/sounds/object.mp3';
const SOUND_ASSEMBLE_URL = '/assets/sounds/assemble.mp3';
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';
const SOUND_CLICK_URL = '/assets/sounds/click.mp3';

const globalStyles = { body: { fontFamily: FONT_FAMILY_ROOT } };
const animatorGeneral = { duration: { enter: 200, exit: 200, stagger: 30 } };
const audio = { common: { volume: 0.4 } };
const players = {
  object: { src: [SOUND_OBJECT_URL] },
  assemble: { src: [SOUND_ASSEMBLE_URL], loop: true },
  typing: { src: [SOUND_TYPING_URL], loop: true },
  click: { src: [SOUND_CLICK_URL] }
};

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <BleepsProvider audio={audio} players={players}>
        <StylesBaseline styles={globalStyles} />
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <Card
            animator={{ activate }}
            image={{
              src: IMAGE_URL,
              alt: 'A nebula'
            }}
            title='Nebula'
            options={
              <Button palette='secondary'>
                <Text>Learn More</Text>
              </Button>
            }
            landscape
            hover
            style={{ maxWidth: 800 }}
          >
            <Text>
              A nebula is an interstellar cloud of dust, hydrogen,
              helium and other ionized gases. Originally, the term
              was used to describe any diffused astronomical object,
              including galaxies beyond the Milky Way.
            </Text>
          </Card>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
