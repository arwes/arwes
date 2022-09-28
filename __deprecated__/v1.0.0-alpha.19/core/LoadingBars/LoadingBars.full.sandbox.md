```jsx
const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <LoadingBars
        animator={{ activate }}
        size={2}
        speed={4}
        full
      />
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
