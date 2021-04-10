```jsx
const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <FrameBox animator={{ animate: false }}>
        <div style={{ width: 200, height: 50 }} />
      </FrameBox>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
