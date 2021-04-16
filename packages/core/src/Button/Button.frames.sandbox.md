```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT },
        button: { margin: '0 20px 20px 0' }
      }} />
      <Animator animator={{ animate: false }}>
        <Button FrameComponent={FrameBox}>
          <Text>Accept and Continue</Text>
        </Button>
        <Button FrameComponent={FrameCorners}>
          <Text>Accept and Continue</Text>
        </Button>
        <Button FrameComponent={FramePentagon}>
          <Text>Accept and Continue</Text>
        </Button>
        <Button FrameComponent={FrameHexagon}>
          <Text>Accept and Continue</Text>
        </Button>
        <Button FrameComponent={FrameUnderline}>
          <Text>Accept and Continue</Text>
        </Button>
        <Button FrameComponent={FrameLines}>
          <Text>Accept and Continue</Text>
        </Button>
      </Animator>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
