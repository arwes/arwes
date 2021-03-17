```jsx
// THE IMAGE IS SET TO 100% WIDTH EVEN IF IT IS SMALLER
// THAN THE CURRENT WIDTH.

const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const IMAGE_URL = '/assets/images/wallpaper.jpg';
const SOUND_OBJECT_URL = '/assets/sounds/object.mp3';
const SOUND_TYPE_URL = '/assets/sounds/type.mp3';

const audioSettings = { common: { volume: 0.25 } };
const playersSettings = {
  object: { src: [SOUND_OBJECT_URL] },
  type: { src: [SOUND_TYPE_URL], loop: true }
};
const bleepsSettings = {
  object: { player: 'object' },
  type: { player: 'type' }
};

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{ body: { fontFamily: ROOT_FONT_FAMILY } }} />
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
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
