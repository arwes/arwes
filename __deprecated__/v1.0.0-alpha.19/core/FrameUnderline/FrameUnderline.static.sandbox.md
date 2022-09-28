```jsx
const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <FrameUnderline animator={{ animate: false }} hover>
        <div style={{ width: 200, height: 50 }} />
      </FrameUnderline>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
