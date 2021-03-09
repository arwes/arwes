```jsx
/* @jsx emotion.jsx */

const Item = ({ palette }) => (
  <div css={theme => {
    const color = theme.palette[palette].main;

    return {
      marginBottom: theme.space(2),
      borderBottom: `${theme.outline(2)}px solid ${color}`,
      padding: theme.space(2),
      backgroundColor: theme.palette.neutral.elevate(2),
      textShadow: `0 0 ${theme.shadow.blur(1)}px ${color}`,
      color
    };
  }}>
    Futuristic Sci-Fi UI Web Framework
  </div>
);

function Sandbox () {
  const theme = createTheme();

  return (
    <emotion.ThemeProvider theme={theme}>
      <emotion.Global styles={{
        'html, body': {
          fontFamily: 'monospace',
          fontSize: 16,
          backgroundColor: theme.palette.neutral.elevate(0)
        }
      }} />
      <Item palette='primary' />
      <Item palette='secondary' />
      <Item palette='success' />
      <Item palette='error' />
    </emotion.ThemeProvider>
  );
}

render(<Sandbox />);
```
