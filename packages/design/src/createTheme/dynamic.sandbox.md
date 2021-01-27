```js
/* @jsx emotion.jsx */

const containerStyles = theme => ({
  margin: theme.space(2),
  border: `1px solid ${theme.palette.primary.light}`,
  padding: theme.space(2),
  background: theme.palette.neutral.elevate(0)
});

const h1Styles = theme => ({
  margin: `0 0 ${theme.space(2)}px`,
  color: theme.palette.primary.main
});

const pStyles = theme => ({
  margin: 0,
  color: theme.palette.primary.dark
});

function Card ({ onClick }) {
  return (
    <div css={containerStyles} onClick={onClick}>
      <h1 css={h1Styles}>Dynamic Theme</h1>
      <p css={pStyles}>
        Click me to update the theme palette.
      </p>
    </div>
  );
}

const colors = [
  { primary: '#ff0', neutral: '#220' },
  { primary: '#f0f', neutral: '#202' },
  { primary: '#0ff', neutral: '#022' }
];

function Sandbox () {
  const [colorIndex, setColorIndex] = React.useState(0);

  const onChangeColorIndex = () => {
    const nextIndex = colorIndex === colors.length - 1
      ? 0
      : colorIndex + 1;
    setColorIndex(nextIndex);
  };

  const theme = React.useMemo(() => {
    return createTheme({
        palette: {
          tonalOffset: 0.1,
          primary: { main: colors[colorIndex].primary },
          neutral: { main: colors[colorIndex].neutral }
        },
        typography: {
          root: { fontFamily: 'monospace' },
          h1: { fontSize: 30 },
          p: { fontSize: 18 }
        },
        space: 10
      });
  }, [colorIndex]);

  return (
    <emotion.ThemeProvider theme={theme}>
      <emotion.Global styles={theme.typography} />
      <Card onClick={onChangeColorIndex} />
    </emotion.ThemeProvider>
  );
}

render(<Sandbox />);
```
