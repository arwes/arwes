```jsx
const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setActivate(!activate);
      if (!activate) {
        setProgress(0);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [activate]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      }
    }, 10);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <ArwesThemeProvider>
      <StylesBaseline />
      <LoadingBars
        animator={{ activate }}
        determinate
        progress={progress}
      />
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
