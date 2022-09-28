```jsx
const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <LoadingBars animator={{ animate: false }} />
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
