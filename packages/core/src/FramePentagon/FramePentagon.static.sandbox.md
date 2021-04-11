```jsx
const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <FramePentagon animator={{ animate: false }} hover>
        <div style={{ width: 200, height: 50 }} />
      </FramePentagon>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
