```jsx
const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const IMAGE_URL = '/assets/images/wallpaper-large.jpg';

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: ROOT_FONT_FAMILY }
      }} />
      <Figure
        animator={{ animate: false }}
        src={IMAGE_URL}
        alt='A nebula'
      >
        A nebula is an interstellar cloud of dust, hydrogen, helium and
        other ionized gases. Originally, the term was used to describe
        any diffused astronomical object, including galaxies beyond
        the Milky Way.
      </Figure>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
