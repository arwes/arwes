```jsx
const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <FrameLines animator={{ animate: false }}>
        <div style={{ width: 200, height: 100 }} />
      </FrameLines>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
