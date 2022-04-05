```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

function Sandbox () {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT }
      }} />
      <Text animator={{ animate: false }}>
        Lorem ipsum dolor sit amet, <b>consectetur adipiscing</b> elit,
        sed do eiusmod tempor <i>incididunt <b>ut labore et dolore
        magna</b> aliqua</i>. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco <a href='#'>laboris nisi ut aliquip</a> ex
        ea commodo consequat.
      </Text>
    </ArwesThemeProvider>
  );
}

render(<Sandbox />);
```
