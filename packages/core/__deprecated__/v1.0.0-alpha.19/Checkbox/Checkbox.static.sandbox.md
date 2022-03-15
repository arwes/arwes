```jsx
const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const Sandbox = () => {
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{
        body: { fontFamily: FONT_FAMILY_ROOT },
        '.arwes-checkbox': { marginBottom: 20 }
      }} />
      <Animator animator={{ animate: false }}>
        <form>
          <Checkbox defaultChecked={true}>
            <Text>Input checkbox element.</Text>
          </Checkbox>

          <Checkbox defaultChecked={false}>
            <Text>A nebula is an interstellar cloud of dust, hydrogen,
            helium and other ionized gases. Originally, the term was
            used to describe any diffused astronomical object, including
            galaxies beyond the Milky Way.</Text>
          </Checkbox>

          <Checkbox
            defaultChecked={true}
            readOnly
          >
            <Text>ReadOnly input checkbox element.</Text>
          </Checkbox>

          <Checkbox
            defaultChecked={true}
            disabled
          >
            <Text>Disabled input checkbox element.</Text>
          </Checkbox>

          <Checkbox
            defaultChecked={false}
            autoFocus
          >
            <Text>
              AutoFocus input checkbox element.
              <b>Press SPACE key to update.</b>
            </Text>
          </Checkbox>

          <Checkbox
            defaultChecked={false}
            palette='secondary'
          >
            <Text>Palette input checkbox element.</Text>
          </Checkbox>

        </form>
      </Animator>
    </ArwesThemeProvider>
  );
};

render(<Sandbox />);
```
