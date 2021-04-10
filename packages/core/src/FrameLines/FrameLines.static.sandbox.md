```jsx
const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <FrameLines animator={{ animate: false }} hover>
        <div style={{ width: 200, height: 50 }} />
      </FrameLines>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
