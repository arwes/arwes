```jsx
// THE IMAGE IS SET TO 100% WIDTH EVEN IF IT IS SMALLER
// THAN THE CURRENT WIDTH.

const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const IMAGE_URL = '/assets/images/wallpaper.jpg';
const SOUND_TYPING_URL = '/assets/sounds/typing.mp3';
const SOUND_FIGURE_URL = '/assets/sounds/figure.mp3';

const audio = { common: { volume: 0.4 } };
const players = {
  typing: { src: [SOUND_TYPING_URL], loop: true },
  figure: { src: [SOUND_FIGURE_URL] }
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
