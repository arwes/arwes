```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const IMAGE_URL = '/assets/images/wallpaper.jpg';

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT }
      }} />
      <Card
        animator={{ animate: false }}
        image={{
          src: IMAGE_URL
        }}
        title='Nebula'
        options={
          <Button palette='secondary'>
            <Text>Learn More</Text>
          </Button>
        }
        style={{ maxWidth: 400 }}
      >
        <Text>
          A nebula is an interstellar cloud of dust, hydrogen,
          helium and other ionized gases. Originally, the term
          was used to describe any diffused astronomical object,
          including galaxies beyond the Milky Way.
        </Text>
      </Card>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
