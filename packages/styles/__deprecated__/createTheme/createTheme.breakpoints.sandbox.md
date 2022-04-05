```jsx
// RESIZE THE BROWSER VIEWPORT TO TEST
// THE MEDIA QUERIES STYLES.

/* @jsx emotion.jsx */

const Heading = ({ palette }) => (
  <div css={theme => ({
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red',

    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
      color: 'green'
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: 32,
      color: 'blue'
    }
  })}>
    Arwes - Futuristic Sci-Fi UI Web Framework
  </div>
);

function Sandbox () {
  const theme = createTheme();

  return (
    <emotion.ThemeProvider theme={theme}>
      <Heading />
    </emotion.ThemeProvider>
  );
}

render(<Sandbox />);
```
