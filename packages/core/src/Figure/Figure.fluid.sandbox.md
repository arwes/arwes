```jsx
const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const IMAGE_URL = '/assets/images/wallpaper-large.jpg';
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';
const SOUND_OBJECT_URL = '/assets/sounds/object.mp3';

const audio = {
  common: { volume: 0.4 }
};
const players = {
  typing: { src: [SOUND_TYPING_URL], loop: true },
  object: { src: [SOUND_OBJECT_URL] }
};

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{ body: { fontFamily: ROOT_FONT_FAMILY } }} />
      <BleepsProvider audio={audio} players={players}>
        <Figure
          src={IMAGE_URL}
          alt='A nebula'
          fluid
        >
          A nebula is an interstellar cloud of dust, hydrogen, helium and
          other ionized gases.
        </Figure>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
