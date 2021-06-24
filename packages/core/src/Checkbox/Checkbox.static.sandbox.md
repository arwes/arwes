```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const fieldStyle = { marginBottom: 20 };

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT }
      }} />
      <Animator animator={{ animate: false }}>
        <form>
          <Checkbox
            defaultChecked={true}
            style={fieldStyle}
          >
            <Text>Input checkbox element.</Text>
          </Checkbox>

          <Checkbox
            defaultChecked={false}
            style={fieldStyle}
          >
            <Text>A nebula is an interstellar cloud of dust, hydrogen,
            helium and other ionized gases. Originally, the term was
            used to describe any diffused astronomical object, including
            galaxies beyond the Milky Way.</Text>
          </Checkbox>

          <Checkbox
            defaultChecked={true}
            readOnly
            style={fieldStyle}
          >
            <Text>ReadOnly input checkbox element.</Text>
          </Checkbox>

          <Checkbox
            defaultChecked={true}
            disabled
            style={fieldStyle}
          >
            <Text>Disabled input checkbox element.</Text>
          </Checkbox>

          <Checkbox
            defaultChecked={false}
            palette='secondary'
            style={fieldStyle}
          >
            <Text>Palette input checkbox element.</Text>
          </Checkbox>

          <Checkbox
            autoFocus
            defaultChecked={false}
            style={fieldStyle}
          >
            <Text>
              Autofocus input checkbox element.
              <b>Press SPACE key on load.</b>
            </Text>
          </Checkbox>

        </form>
      </Animator>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
