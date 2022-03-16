```jsx
/* @jsx emotion.jsx */

// CARD

const cardStyles = {
  container: theme => ({
    borderStyle: 'solid',
    borderWidth: theme.outline(1),
    borderColor: theme.palette.primary.light1,
    padding: theme.space(2)
  }),
  title: theme => ({
    margin: `0 0 ${theme.space(2)}px`,
    color: theme.palette.primary.main
  }),
  description: theme => ({
    margin: 0,
    color: theme.palette.primary.dark1
  })
};

function Card ({ onClick }) {
  return (
    <div css={cardStyles.container} onClick={onClick}>
      <h1 css={cardStyles.title}>
        Dynamic Theme Palette
      </h1>
      <p css={cardStyles.description}>
        Click me to update the theme variant!
      </p>
    </div>
  );
}

// THEMES

const THEMES = [
  {
    palette: {
      primary: { main: '#ff0' },
      neutral: { main: '#220' },
    },
    space: 4,
    outline: 2
  },
  {
    palette: {
      primary: { main: '#f0f' },
      neutral: { main: '#202' },
    },
    space: 8,
    outline: 4
  },
  {
    palette: {
      primary: { main: '#0ff' },
      neutral: { main: '#022' },
    },
    space: 12,
    outline: 6
  }
];

// SANDBOX

function Sandbox () {
  const [themeIndex, setThemeIndex] = React.useState(0);

  const onChangeThemeIndex = () => {
    const isLast = themeIndex === THEMES.length - 1;
    const nextIndex = isLast ? 0 : themeIndex + 1;
    setThemeIndex(nextIndex);
  };

  const theme = React.useMemo(
    () => createTheme(THEMES[themeIndex]),
    [themeIndex]
  );

  return (
    <emotion.ThemeProvider theme={theme}>
      <emotion.Global styles={{
        'html, body': {
          fontFamily: 'monospace',
          backgroundColor: theme.palette.neutral.elevate(0)
        }
      }} />
      <Card onClick={onChangeThemeIndex} />
    </emotion.ThemeProvider>
  );
}

render(<Sandbox />);
```
