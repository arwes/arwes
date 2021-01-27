```js
/* @jsx emotion.jsx */

// THIS SANDBOX MODIFIES THE HTML ELEMENTS GLOBAL STYLES.
// IT MAY CONFLICT WITH THE PLAYGROUND APPLICATION STYLES.

// CARD

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

function Card () {
  return (
    <div css={containerStyles}>
      <h1 css={h1Styles}>Lorem ipsum dolor</h1>
      <p css={pStyles}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
    </div>
  );
}

// SANDBOX

function Sandbox () {
  const theme = createTheme({
    palette: {
      primary: { main: '#ff0' },
      neutral: { main: '#110' }
    },
    typography: {
      h1: { fontSize: 30, fontFamily: 'monospace' },
      p: { fontSize: 18, fontFamily: 'sans-serif' }
    },
    space: 10
  });
  return (
    <emotion.ThemeProvider theme={theme}>
      <emotion.Global styles={theme.typography} />
      <Card />
    </emotion.ThemeProvider>
  );
}

render(<Sandbox />);
```
