```jsx
const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <FrameCorners animator={{ animate: false }} hover>
        <div style={{ width: 200, height: 50 }} />
      </FrameCorners>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
