```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT }
      }} />
      <FrameUnderline animator={{ animate: false }} hover disabled>
        <Text>
          Futuristic Sci-Fi UI Web Framework
        </Text>
      </FrameUnderline>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
