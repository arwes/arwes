```jsx
const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const IMAGE_URL = '/assets/images/img5.jpg';
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';
const SOUND_OBJECT_URL = '/assets/sounds/object.mp3';

const audio = {
  common: { volume: 0.4 }
};
const players = {
  typing: { src: [SOUND_TYPING_URL], loop: true },
  object: { src: [SOUND_OBJECT_URL] }
};
const generalAnimator = { duration: { enter: 200, exit: 200 } };

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{ body: { fontFamily: ROOT_FONT_FAMILY } }} />
      <BleepsProvider audio={audio} players={players}>
        <AnimatorGeneralProvider animator={generalAnimator}>
          <Figure
            src={IMAGE_URL}
            alt='A nebula'
            preload
          >
            A nebula is an interstellar cloud of dust, hydrogen, helium and
            other ionized gases. Originally, the term was used to describe
            any diffused astronomical object, including galaxies beyond
            the Milky Way.
          </Figure>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
