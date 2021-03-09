```jsx
const Color = ({ color }) => (
  <div style={{
    width: 60,
    height: 60,
    backgroundColor: color
  }} />
);

const PaletteBasic = ({ palette }) => {
  const theme = emotion.useTheme();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      <Color color={theme.palette[palette].dark3} />
      <Color color={theme.palette[palette].dark2} />
      <Color color={theme.palette[palette].dark1} />
      <Color color={theme.palette[palette].main} />
      <Color color={theme.palette[palette].light1} />
      <Color color={theme.palette[palette].light2} />
      <Color color={theme.palette[palette].light3} />
    </div>
  );
};

const PaletteElevation = ({ palette }) => {
  const theme = emotion.useTheme();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      <Color color={theme.palette[palette].elevate(0)} />
      <Color color={theme.palette[palette].elevate(1)} />
      <Color color={theme.palette[palette].elevate(2)} />
      <Color color={theme.palette[palette].elevate(3)} />
      <Color color={theme.palette[palette].elevate(4)} />
      <Color color={theme.palette[palette].elevate(5)} />
      <Color color={theme.palette[palette].elevate(6)} />
    </div>
  );
};

function Sandbox () {
  const theme = createTheme({
    palette: {
      // Default theme palette basic colors.
      tonalOffset: 0.1,
      primary: { main: '#0ff' },
      secondary: { main: '#ff0' },
      success: { main: '#0f0' },
      error: { main: '#f00' },

      // Default theme palette elevation colors.
      elevationOffset: 0.025,
      neutral: { main: '#000' },

      // Custom theme palettes.
      yourOwnBasicPalette: createThemePaletteBasic({ main: '#f0f' }, 0.1),
      yourOwnElevationPalette: createThemePaletteElevation('#101', 0.025)
    }
  });

  return (
    <emotion.ThemeProvider theme={theme}>
      <PaletteBasic palette='primary' />
      <PaletteBasic palette='secondary' />
      <PaletteBasic palette='success' />
      <PaletteBasic palette='error' />
      <br />
      <PaletteElevation palette='neutral' />
      <br />
      <PaletteBasic palette='yourOwnBasicPalette' />
      <PaletteElevation palette='yourOwnElevationPalette' />
    </emotion.ThemeProvider>
  );
}

render(<Sandbox />);
```
