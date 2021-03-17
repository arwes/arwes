```jsx
// RESIZE THE BROWSER TO SEE THE FIGURE RESPONSIVE IMAGES.

const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const IMAGE_XS_URL = '/assets/images/wallpaper.jpg';
const IMAGE_MD_URL = '/assets/images/wallpaper-medium.jpg';
const IMAGE_LG_URL = '/assets/images/wallpaper-large.jpg';
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
          src={[
            IMAGE_XS_URL,
            undefined, // SM is ignored
            IMAGE_MD_URL,
            IMAGE_LG_URL
            // XL is ignored
          ]}
          alt='A nebula'
        >
          A nebula is an interstellar cloud of dust, hydrogen, helium and
          other ionized gases. Originally, the term was used to describe
          any diffused astronomical object, including galaxies beyond
          the Milky Way.
        </Figure>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
