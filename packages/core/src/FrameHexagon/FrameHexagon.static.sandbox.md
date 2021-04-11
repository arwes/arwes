```jsx
const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <FrameHexagon animator={{ animate: false }} hover>
        <div style={{ width: 200, height: 50 }} />
      </FrameHexagon>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
